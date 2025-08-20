import type { BaseResponse } from "@/types/response";

// Construct a BackendError from a BaseResponse object
class BackendError extends Error {
  status: string;
  status_code: number;

  constructor({ status, status_code, message }: BaseResponse) {
    super(message);
    this.name = "BackendError";
    this.status = status;
    this.status_code = status_code;

    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

export default BackendError;
