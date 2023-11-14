const {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
} = require("../utils/errorTypes");

module.exports = function errorHandler(err, req, res, next) {
  const errorDetails = {
    message: err.message,
    stack: err.stack,
  };
  console.error(errorDetails);

  let clientMessage = "An error occurred.";

  // A sample of how to organize different errors with their messages.
  if (err instanceof ValidationError) {
    res.status(400);
    clientMessage = err.message;
  } else if (err instanceof AuthenticationError) {
    res.status(401);
    clientMessage = "Invalid username or password";
  } else if (err instanceof AuthorizationError) {
    res.status(403);
    clientMessage = "Access denied!";
  } else if (err instanceof DatabaseError) {
    res.status(500);
    clientMessage = "An error occurred while processing your request.";
  } else {
    res.status(500);
  }

  res.json({ error: clientMessage });
};
