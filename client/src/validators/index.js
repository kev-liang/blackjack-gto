const numberValidator = (number) => {
  return (
    (!isNaN(number) && number !== " ") || number === "" || number.endsWith(".")
  );
};

const greaterThanZeroValidator = (number) => {
  return number >= 0;
};

export { numberValidator, greaterThanZeroValidator };
