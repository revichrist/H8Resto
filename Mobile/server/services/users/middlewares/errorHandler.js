function errorHandler(error, request, response, next) {
  let message = "Internal server error";
  let statusCode = 500;

  console.log(error, 5);
  console.log(error.name, "from error handler ", 6);
  switch (error.name) {
    case "DataNotFound":
      statusCode = 404;
      message = "Can't find the data";
      break;

      case "BSONError":
      statusCode = 400;
      message = "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer";
      break;

    case "AllFieldRequired":
      statusCode = 400;
      message = "Please fill all the field";
      break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
