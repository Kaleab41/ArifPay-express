## `makePayment` API Handler Documentation

### **Description**
Handles a payment initiation request to the ArifPay API. It validates input fields, ensures the data's integrity, and makes a POST request to create a checkout session.

---

### **Endpoint**
`POST /api/payment`

---

### **Environment Variables**
- `BASE_URL`: Base URL of the payment gateway (default: `http://gateway.arifpay.net/api`)
- `CHECKOUT_URL`: Path to checkout session (default: `/checkout/session`)
- `API_KEY`: Bearer token for authorization

---

### **Sample Successful Request Body**
```json
{
  "cancelUrl": "https://example.com",
  "phone": "251954926213",
  "email": "telebirrTest@gmail.com",
  "nonce": "AAAa1289832asdrs",
  "errorUrl": "http://error.com",
  "notifyUrl": "https://example.com",
  "successUrl": "http://example.com",
  "paymentMethods": [
    "TELEBIRR", "AWASH", "AWASH_WALLET", "PSS", "CBE", "AMOLE",
    "BOA", "KACHA", "TELEBIRR_USSD", "HELLOCASH", "MPESSA"
  ],
  "expireDate": "2025-02-01T03:45:27",
  "items": [
    {
      "name": "ምዝ",
      "quantity": 1,
      "price": 2,
      "description": "Fresh Corner preimuim Banana.",
      "image": "https://4.imimg.com/data4/KK/KK/GLADMIN-/product-8789_bananas_golden-500x500.jpg"
    }
  ],
  "beneficiaries": [
    {
      "accountNumber": "01320811436100",
      "bank": "AWINETAA",
      "amount": 2.0
    }
  ],
  "lang": "EN"
}
```

---

### **Validations**
- All fields must be present.
- `phone` must follow Ethiopian format: starts with `251` and is 13 digits long.
- `expireDate` must be a valid future date.
- `items` must include numeric `quantity` and `price` values.

---

### **Responses**

- **200 OK**
```json
{
  "message": "Success",
  "data": { ... } // Response from ArifPay
}
```

- **400 Bad Request**
```json
{
  "message": "Invalid phone number use 2519xxxxxxxx"
}
```
```json
{
  "message": "All fields are required"
}
```

- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

---

### **Function Summary**
```js
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
```

