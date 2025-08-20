import { toast } from "react-toastify";
import handleToastError from "./handle-toast-error";

// Type Definitions
import type {
  RefetchOptions,
  QueryObserverResult,
  DefaultError,
} from "@tanstack/react-query";

// Type for a generic refetch function used by React Query
type DataRefetcher<T = unknown> = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<T | undefined, DefaultError>>;

// Structure for customizable toast messages during refresh
interface RefreshMessages {
  loading: string;
  success: string;
}

// Creates an async refresh handler that refetches data and shows toast updates
const createRefreshHandler = <T>(
  messages: RefreshMessages,
  refetchData: DataRefetcher<T>
) => {
  return async function () {
    const toastId = toast.loading(messages.loading);
    try {
      await refetchData({ throwOnError: true });
      toast.update(toastId, {
        render: messages.success,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (error) {
      handleToastError(toastId, error);
    }
  };
};

export default createRefreshHandler;
