import { z } from "zod";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Check if error is a ZodError
  if (err instanceof z.ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    // Log formatted errors

    console.error(`Zod Validation Errors:`);
    formattedErrors.forEach((error) => {
      console.error(`Field: ${error.field}, Message: ${error.message}`);
    });

    // Send formatted errors in response

    res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
    return;
  }

  console.error(`ErrorMessage: ${message}`);
  console.error(`Stack: ${err.stack}`);

  console.error(`Request URL: ${req.originalUrl}`);
  console.error(`Request Method: ${req.method}`);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;
