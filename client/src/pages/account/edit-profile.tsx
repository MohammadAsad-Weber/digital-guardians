import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// Form handling & validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { UpdateUserSchema } from "@/schemas/user";
import { getUser, updateUser } from "@/services/account";

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
document.title = "Edit Account • Digital Guardians";

function EditProfile() {
  // Fetch user data using React Query's `useQuery` hook
  const { status, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(UpdateUserSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // When fresh user data is fetched, update the form values accordingly
  useEffect(() => {
    if (data) {
      reset({
        username: data.username || "",
        email: data.email || "",
        password: "",
      });
    }
  }, [data, reset]);

  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { username, email, password } = errors;

  // Watch form values to track changes
  const formValues = watch();

  // Determine if user has made any changes (only checks username & email)
  const hasChanges = useMemo(() => {
    const fields = ["username", "email"] as const;
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
    return (
      <main className="min-h-screen w-full p-5 flex items-center justify-center">
        <Form onSubmit={handleSubmit((form) => updateUser(form))}>

          {/* FORM HEADER */}
          <FormHeader backTo="/account">
            <FormTitle>Edit Profile</FormTitle>
          </FormHeader>

          {/* FORM BODY */}
          <FormBody>

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
                    : "text-[var(--text-secondary)]"
                }
              >
                Username
              </Label>
              <Input {...register("username")} id="username" />
            </InputContainer>
            <ErrorMessage>{username?.message}</ErrorMessage>

            {/* EMAIL FIELD */}
            <InputContainer
              className={email?.message ? "border-red-500" : "border-gray-500"}
            >
              <Label
                htmlFor="email"
                className={
                  email?.message
                    ? "text-red-500"
                    : "text-[var(--text-secondary)]"
                }
              >
                Email Address
              </Label>
              <Input {...register("email")} type="email" id="email" />
            </InputContainer>
            <ErrorMessage>{email?.message}</ErrorMessage>

            {/* DIVIDER */}
            <div className="w-full h-px bg-gray-400"></div>

            {/* PARAGRAPH */}
            <p className="text-center text-xs text-[var(--text-primary)]">
              Please enter your password to save the changes.
            </p>

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
                    : "text-[var(--text-secondary)]"
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

export default EditProfile;
