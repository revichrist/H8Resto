function errorHandler(error, request, response, next) {
  let message = "Internal server error";
  let statusCode = 500;

  console.log(error, 5);
  console.log(error.name, "from error handler ", 6);
  switch (error.name) {
    case "":
      break
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
