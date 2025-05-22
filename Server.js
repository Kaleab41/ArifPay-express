import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import logger from "./logger.js";

import {
  isValidEthiopianPhoneNumber,
  checkExpireDate,
  validateItems,
} from "./Helpers.js";

import {
  BASE_URL,
  CHECKOUT_URL,
  PAYMENT_METHODS,
  expDate,
} from "./Constants.js";

// Load API key from environment
const API_KEY = process.env.API_KEY;

// Set request headers for ArifPay API
const headers = {
  "Content-Type": "application/json",
  "x-arifpay-key": `${API_KEY}`,
};

/**
 * Create a checkout session with ArifPay.
 *
 * @param {Object} paymentData - Data required to initiate the checkout session
 * @returns {Object} - ArifPay API response
 */
export const createCheckoutSession = async (paymentData) => {
  const {
    phone,
    cancelUrl,
    email, // Optional
    nonce = uuidv4(), // Unique identifier for this session
    errorUrl,
    notifyUrl,
    successUrl,
    paymentMethods = PAYMENT_METHODS,
    expireDate = expDate, // Defaults to 1 hour ahead (UTC)
    items,
    beneficiaries,
    lang = "EN",
  } = paymentData;

  // Required field validation
  const requiredFields = {
    phone,
    cancelUrl,
    errorUrl,
    notifyUrl,
    successUrl,
    items,
    beneficiaries,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Phone number validation
  if (!isValidEthiopianPhoneNumber(phone)) {
    throw new Error(
      "Invalid phone number: must start with 251 and be 12 digits long"
    );
  }

  // Expire date must be in the future
  if (!checkExpireDate(expireDate)) {
    throw new Error("Expire date must be in the future");
  }

  // Validate item structure
  if (!validateItems(items)) {
    throw new Error("Invalid items: item quantity & price must be numbers");
  }

  // Prepare ArifPay API URL and payload
  const url = `${BASE_URL}${CHECKOUT_URL}`;
  const checkoutPayload = {
    phone,
    cancelUrl,
    email,
    nonce,
    errorUrl,
    notifyUrl,
    successUrl,
    paymentMethods,
    expireDate,
    items,
    beneficiaries,
    lang,
  };

  // Log the start of session creation
  logger.info("Creating ArifPay checkout session", {
    phone,
    amount: beneficiaries?.[0]?.amount,
    methods: paymentMethods,
    expireDate,
  });

  try {
    const response = await axios.post(url, checkoutPayload, { headers });

    logger.info("Checkout session created successfully", {
      sessionId: response.data?.sessionId,
    });

    if (response.status !== 200) {
      logger.error("Unexpected status code from ArifPay", {
        status: response.status,
      });
      throw new Error("Failed to create checkout session");
    }

    return response.data;
  } catch (error) {
    // Log and re-throw error
    logger.error("Error creating ArifPay checkout session", {
      error: error.message,
      payload: checkoutPayload,
    });

    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error: ${
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Axios request failed"
        }`
      );
    } else {
      throw new Error(`Error: ${error.message || "Unknown error"}`);
    }
  }
};
