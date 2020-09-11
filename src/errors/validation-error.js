class ValidationError extends Error {
  constructor(message, validationErrors) {
    super(message);
    this.validationErrors = validationErrors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  getValidationErrors() {
    return this.validationErrors;
  }
}

module.exports = ValidationError;
