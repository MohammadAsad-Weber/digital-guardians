import "axios";

// Extend Axios request config with an optional _retry flag for request retries
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
