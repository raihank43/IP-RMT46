module.exports = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.parent.detail.includes("username")
        ? "Username must be unique."
        : error.parent.detail.includes("email")
        ? "Email must be unique"
        : "";
      break;
    case "Unauthenticated":
      status = 401;
      message = "You're not authorized";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "Unauthorized":
      status = 403;
      message = "You're not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Hero not found";
      break;
    case "CustomError":
      status = error.status;
      message = error.message;
      break;
  }

  res.status(status).json({ message: message });
};
