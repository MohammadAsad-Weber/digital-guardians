import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from "react-router";
import handleError from "@/utilities/handleError";
import { useQueryClient } from "@tanstack/react-query";
import handleToastError from "@/utilities/toastErrorHandler";

// Types
import type {
  GeneralResponse,
  UserResponse,
  UpdateUserBody,
  ChangePasswordBody,
} from "@/hooks/types";

// useAccount Hook Logic
function useAccount() {
  // Hooks
  const instance = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Access Token
  const token = localStorage.getItem("access_token");

  // Functions
  const getUser = async () => {
    try {
      // Fetch the user
      const response = await instance.get<
        UserResponse,
        AxiosResponse<UserResponse>
      >("/api/account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Return the user object
      return response.data.user;
    } catch (error) {
      handleError(error)
    }
  };
  const updateUser = async (
    form: UpdateUserBody,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Saving changes");

    try {
      // Send request to the backend
      const response = await instance.put<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        UpdateUserBody
      >("/api/account", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Invalidate the user query
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/account"), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const changePassword = async (
    form: ChangePasswordBody,
    setForm: React.Dispatch<React.SetStateAction<ChangePasswordBody>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Resetting password");

    try {
      // Check if the confirm password matches new password
      if (form.confirmPassword !== form.newPassword) {
        return toast.update(toastId, {
          render: "New and confirm passwords mismatch",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      
      // Send request to the backend
      const response = await instance.put<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        ChangePasswordBody
      >("/api/account/password", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear the form
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Update localStorage
      localStorage.removeItem("access_token");

      // Clear the cached data
      queryClient.clear();

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/auth/login"), 0);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const deleteAccount = async (
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Permanently removing account");

    try {
      // Send request to the backend
      const response = await instance.delete<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        { password: string }
      >("/api/account", {
        data: { password },
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear the input field
      setPassword("");

      // Update localStorage
      localStorage.removeItem("access_token");

      // Clear the cached data
      queryClient.clear();

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/auth/signup"), 0);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };

  return { getUser, updateUser, changePassword, deleteAccount };
}

export default useAccount;
