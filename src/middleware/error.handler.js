const { constants } = require("../constants");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  switch (res.statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      res.status(constants.SERVER_ERROR).json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
  }
  next();
};

module.exports = errorHandler;
