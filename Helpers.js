// Check if phone number is Ethiopian: starts with +251
// Must have 9 digits after +251 (total 13 digits, digits only)
export const isValidEthiopianPhoneNumber = function (phone) {
  //Check if the phone number starts with 251 preceded with a 7 or 9 and has 9 digits after it
  const isValid = /^251[79]\d{8}$/.test(phone);
  return isValid ? phone : null;
};

// Check if the given expire date is in the future
// Returns false if the date has already passed or is today
export const checkExpireDate = function (expireDate) {
  const currentDate = new Date();
  const expireDateObj = new Date(expireDate);
  // Check if the expire date is in the future
  return expireDateObj > currentDate;
};

// Ensures each item's quantity and price are valid numbers
export const validateItems = function (items) {
  return items.every(
    (item) =>
      typeof item.quantity === "number" &&
      !isNaN(item.quantity) &&
      typeof item.price === "number" &&
      !isNaN(item.price)
  );
};
