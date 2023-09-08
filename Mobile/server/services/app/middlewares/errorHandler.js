function errorHandler(error, request, response, next) {
  let message = "Internal server error";
  let statusCode = 500;

  console.log(error, "<<< error handler", 5);
  console.log(error.name, "<<< error handler", 6);

  switch (error.name) {
    case "IngredientsRequired":
      statusCode = 400;
      message = "Ingredients name shouldn't be empty";
      break;

    case "Forbidden":
      statusCode = 403;
      message = "You are not authorized to do this action";
      break;

    case "CategoryRequired":
      statusCode = 400;
      message = "Category is required";
      break;

    case "DataNotFound":
      statusCode = 404;
      message = "Data not Found";
      break;

    case "EmailRequired":
      statusCode = 400;
      message = "Email is required";
      break;

    case "PasswordRequired":
      statusCode = 400;
      message = "Password is required";
      break;

    case "Unauthorized":
      message = "Invalid email or password";
      statusCode = 401;
      break;

    case "JsonWebTokenError":
      message = "You need to login before accessing even further";
      statusCode = 401;
      break;

    case "CategoryNameRequired":
      statusCode = 400;
      message = "Category name is required";
      break;

    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = error.errors[0].message;
      break;

    case "SequelizeValidationError":
      statusCode = 400;
      const errorMapping = error.errors.map((el) => {
        return el.message;
      });

      if (errorMapping.length === 1) {
        message = errorMapping[0];
      } else {
        message = errorMapping;
      }
      break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
