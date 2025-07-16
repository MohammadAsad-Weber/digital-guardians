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
  PasswordsResponse,
  PasswordResponse,
  CreatePasswordBody,
  UpdatePasswordBody,
} from "@/hooks/types";

// usePassword Hook Logic
function usePassword() {
  // Hooks
  const instance = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Access Token
  const token = localStorage.getItem("access_token");

  // Functions
  const getPasswords = async () => {
    try {
      // Fetch the passwords
      const response = await instance.get<
        PasswordsResponse,
        AxiosResponse<PasswordsResponse>
      >("/api/passwords", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Return the passwords array
      return response.data.passwords;
    } catch (error) {
      handleError(error)
    }
  };
  const getPassword = async (id: string) => {
    try {
      // Fetch the password
      const response = await instance.get<
        PasswordResponse,
        AxiosResponse<PasswordResponse>
      >(`/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Return the password object
      return response.data.password;
    } catch (error) {
      handleError(error)
    }
  };
  const createPassword = async (
    form: CreatePasswordBody,
    setForm: React.Dispatch<React.SetStateAction<CreatePasswordBody>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Creating your password");

    try {
      // Create a clean siteURL
      const website = new URL(form.siteURL);

      // Update the form data
      const data = { ...form, siteURL: website.origin };

      // Send request to the backend
      const response = await instance.post<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        CreatePasswordBody
      >(`/api/passwords`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear the form
      setForm({
        siteURL: "",
        username: "",
        password: "",
      });

      // Invalidate the passwords query
      queryClient.invalidateQueries({ queryKey: ["passwords"] });

      /// Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/vault"), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const updatePassword = async (
    id: string,
    form: UpdatePasswordBody,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Saving changes");

    try {
      // Create a clean siteURL
      const website = new URL(form.siteURL);

      // Update the form data
      const data = { ...form, siteURL: website.origin };

      // Send request to the backend
      const response = await instance.put<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        UpdatePasswordBody
      >(`/api/passwords/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Invalidate the passwords query
      queryClient.invalidateQueries({ queryKey: ["passwords"] });

      /// Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate(`/vault/${id}`), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const deletePassword = async (id: string) => {
    // Show loading toast and capture the ID
    const toastId = toast.loading("Removing password permanently");

    try {
      // Send request to the backend
      const response = await instance.delete<
        GeneralResponse,
        AxiosResponse<GeneralResponse>
      >(`/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Invalidate the passwords query
      queryClient.invalidateQueries({ queryKey: ["passwords"] });

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/vault"), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };

  return {
    getPasswords,
    getPassword,
    createPassword,
    updatePassword,
    deletePassword,
  };
}

export default usePassword;
