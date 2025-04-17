const { default: axios } = require("axios");
require("dotenv").config();
const uuid = require("uuid");

const BASE_URL = process.env.BASE_URL || "http://gateway.arifpay.net/api";
const CHECKOUT_URL = process.env.CHECKOUT_URL || "/checkout/session";

import {
  isValidEthiopianPhoneNumber,
  checkExpireDate,
  validateItems,
} from "./Helpers.js";
/**
 * Handles payment initiation via ArifPay API.
 *
 * - Validates required fields from the request body
 * - Checks if the phone number is a valid Ethiopian number
 * - Ensures the expiration date is in the future
 * - Confirms all item quantities and prices are numeric
 * - Generates a unique nonce for transaction tracking
 * - Sends a POST request to ArifPay to create a checkout session
 * - Returns the API response or an appropriate error message
 *
 * @param {Object} req - Express request object containing payment data
 * @param {Object} res - Express response object used to return API response
 */

export const makePayment = async (paymentData) => {
  const {
    phone,
    cancelUrl,
    successUrl,
    errorUrl,
    notifyUrl,
    paymentMethods,
    expireDate,
    items,
    beneficiaries,
    lang,
  } = paymentData;

  const requiredFields = [
    phone,
    cancelUrl,
    successUrl,
    errorUrl,
    notifyUrl,
    paymentMethods,
    expireDate,
    items,
    beneficiaries,
    lang,
  ];

  if (requiredFields.some((field) => !field)) {
    throw new Error("All fields are required");
  }
  if (!isValidEthiopianPhoneNumber(phone)) {
    throw new Error("Invalid phone number use 2519xxxxxxxx");
  }
  if (!checkExpireDate(expireDate)) {
    throw new Error("Expire date must be in the future");
  }
  if (!validateItems(items)) {
    throw new Error("Invalid items quantity & price should be numbers");
  }

  const url = `${BASE_URL}${CHECKOUT_URL}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
  const nonce = uuidv4();

  const payload = {
    nonce,
    phone,
    cancelUrl,
    successUrl,
    errorUrl,
    notifyUrl,
    paymentMethods,
    expireDate,
    items,
    beneficiaries,
    lang,
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
};

