import type { ErrorResponse } from "@/hooks/types";

class BackendError extends Error {
  status: string;
  status_code: number;

  constructor({ message, status, status_code }: ErrorResponse) {
    super(message);
    this.name = "BackendError";
    this.status = status;
    this.status_code = status_code;

    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

export default BackendError;
