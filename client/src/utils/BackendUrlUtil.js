const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.BACK_END_URL;

module.exports = url;
