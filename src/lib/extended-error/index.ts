
export class ExtendedError extends Error {
  public responseCode: string;
  public responseMessage: string;
  public errors?: Record<string, string>;
  public status?: number;

  constructor(
    message: string,
    responseCode: string = "50000",
    errors?: Record<string, string>,
    status?: number
  ) {
    super(message);
    this.name = "ExtendedError";
    this.responseCode = responseCode;
    this.responseMessage = message;
    this.errors = errors;
    this.status = status;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExtendedError);
    }
  }

  // Helper method untuk create dari API response
  static fromApiResponse(responseData: any, status?: number): ExtendedError {
    return new ExtendedError(
      responseData.responseMessage || "Unknown error occurred",
      responseData.responseCode,
      responseData.errors,
      status
    );
  }

  // Check whether the error is a validation error.
  isValidationError(): boolean {
    return this.responseCode === "42200" && !!this.errors;
  }

  // Get error message untuk field tertentu
  getFieldError(fieldName: string): string | undefined {
    return this.errors?.[fieldName];
  }
}
