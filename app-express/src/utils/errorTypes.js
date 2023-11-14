class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class AuthenticationError extends Error {}

class AuthorizationError extends Error {}

class DatabaseError extends Error {}

// That's usually how I would create different types of errors to be used in the backend

module.exports = {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
};
