const numberValidator = (number) => {
  return (!isNaN(number) && number !== " ") || number === "";
};

const greaterThanZeroValidator = (number) => {
  return number >= 0;
};

export { numberValidator, greaterThanZeroValidator };
