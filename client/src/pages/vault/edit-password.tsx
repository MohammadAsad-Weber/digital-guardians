import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// Services & Types for Password Data
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PasswordData } from "@/types/response";

// Application services & schemas
import { UpdatePasswordSchema } from "@/schemas/password";
import { getPassword, updatePassword } from "@/services/password";

// Components & Utility
import { BackendError } from "@/utilities";
import Spinner from "@/components/spinner";
import ErrorPage from "@/components/error-page";

// UI Form Components
import {
  Form,
  FormHeader,
  FormTitle,
  FormBody,
  InputContainer,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
} from "@/components/ui/form";

// Rename the title
document.title = "Edit Password • Digital Guardians";

function EditPassword() {
  // Extract route parameter
  const { id } = useParams<{ id: string }>();

  // Fetch password data using React Query's `useQuery` hook
  const { status, data, error } = useQuery({
    queryKey: ["passwords", { id }],
    queryFn: () => getPassword(id as string),
  });
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      siteURL: "",
      username: "",
      password: "",
    },
  });

  // When fresh user data is fetched, update the form values accordingly
  useEffect(() => {
    if (data) {
      reset({
        siteURL: data.siteURL || "",
        username: data.username || "",
        password: data.password || "",
      });
    }
  }, [data, reset]);

  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { siteURL, username, password } = errors;

  // Watch form values to track changes
  const formValues = watch();

  // Determine if user has made any changes
  const hasChanges = useMemo(() => {
    const fields = ["siteURL", "username", "password"] as const;
    return fields.some((field) => formValues[field] !== data?.[field]);
  }, [formValues, data]);

  // Pending state
  if (status === "pending") return <Spinner />;

  // Error stata
  if (status === "error") {
    const backendError = error as BackendError;
    return (
      <ErrorPage
        status={backendError.status}
        status_code={backendError.status_code}
        message={backendError.message}
      />
    );
  }
  // Success state
  if (status === "success") {
    const passwordData = data as PasswordData;
    return (
      <main className="min-h-screen w-full p-5 flex items-center justify-center form-pattern">
        <Form
          onSubmit={handleSubmit((form) => updatePassword(passwordData._id, form))}
        >
          {/* FORM HEADER */}
          <FormHeader backTo={`/vault/${passwordData._id}`}>
            <FormTitle>Edit Password</FormTitle>
          </FormHeader>

          {/* FORM BODY */}
          <FormBody>

            {/* SITEURL FIELD */}
            <InputContainer
              className={
                siteURL?.message ? "border-red-500" : "border-gray-500"
              }
            >
              <Label
                htmlFor="siteURL"
                className={
                  siteURL?.message
                    ? "text-red-500"
                    : "text[var(--text-secondary)]"
                }
              >
                Site URL
              </Label>
              <Input {...register("siteURL")} type="url" id="siteURL" />
            </InputContainer>
            <ErrorMessage>{siteURL?.message}</ErrorMessage>

            {/* USERNAME FIELD */}
            <InputContainer
              className={
                username?.message ? "border-red-500" : "border-gray-500"
              }
            >
              <Label
                htmlFor="username"
                className={
                  username?.message
                    ? "text-red-500"
                    : "text[var(--text-secondary)]"
                }
              >
                Username
              </Label>
              <Input {...register("username")} id="username" />
            </InputContainer>
            <ErrorMessage>{username?.message}</ErrorMessage>

            {/* PASSWORD FIELD */}
            <InputContainer
              className={
                password?.message ? "border-red-500" : "border-gray-500"
              }
            >
              <Label
                htmlFor="password"
                className={
                  password?.message
                    ? "text-red-500"
                    : "text[var(--text-secondary)]"
                }
              >
                Password
              </Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                value={formValues.password}
              />
            </InputContainer>
            <ErrorMessage>{password?.message}</ErrorMessage>
            
          </FormBody>

          {/* SUBMIT BUTTON */}
          <SubmitButton
            disabled={!isValid || !hasChanges || isSubmitting}
          >
            Save Changes
          </SubmitButton>

        </Form>
      </main>
    );
  }
}

export default EditPassword;
