import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface IValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errors: IValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });
    // bad request
    return response.status(400).json({ message: 'Validation fail', errors });
  }

  console.error('error', error);
  // internal error
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
