const TELEBIRR = "TELEBIRR";
const AWASH = "AWASH";
const AWASH_WALLET = "AWASH_WALLET";
const PSS = "PSS";
const CBE = "CBE";
const AMOLE = "AMOLE";
const BOA = "BOA";
const KACHA = "KACHA";
const HELLOCASH = "HELLOCASH";
const MPESSA = "MPESSA";

const BASE_URL = process.env.BASE_URL || "https://gateway.arifpay.org/api";
const CHECKOUT_URL = process.env.CHECKOUT_URL || "/checkout/session";

const PAYMENT_METHODS = [
  TELEBIRR,
  AWASH,
  AWASH_WALLET,
  PSS,
  CBE,
  AMOLE,
  BOA,
  KACHA,
  HELLOCASH,
  MPESSA,
];

const expire = new Date();
expire.setHours(expire.getHours() + 1);
const expDate = expire.toISOString();

export {
  TELEBIRR,
  AWASH,
  AWASH_WALLET,
  PSS,
  CBE,
  AMOLE,
  BOA,
  KACHA,
  HELLOCASH,
  MPESSA,
  BASE_URL,
  CHECKOUT_URL,
  PAYMENT_METHODS,
  expDate,
};
