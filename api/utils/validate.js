const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.isValidEmail = (email) => EMAIL_REGEX.test(email);

// accepts strings from req.body as well as actual numbers
exports.isPositiveInt = (val) => {
  const n = Number(val);
  return Number.isInteger(n) && n > 0;
};
