import useAccount from "@/hooks/useAccount";
import BackendError from "@/utilities/BackendError";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

// UI Components
import {
  Form,
  FormHeader,
  FormTitle,
  FormBody,
  InputContainer,
  Label,
  Input,
  SubmitButton,
} from "@/components/ui/form";

// Components
import Spinner from "@/components/Spinner";
import ErrorPage from "@/components/ErrorPage";

// Rename the title
document.title = "Edit Account • Digital Guardians";

function EditProfile() {
  // Hooks
  const { getUser, updateUser } = useAccount();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { status, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      updateUser(form, event),
  });

  // Sync form with fetched data
  useEffect(() => {
    if (data) {
      setForm({
        username: data.username,
        email: data.email,
        password: "",
      });
    }
  }, [data]);

  // Check if the user is same as before
  const isSameAsBefore = useMemo(() => {
    if (form.username === data?.username && form.email === data?.email)
      return true;
    else return false;
  }, [form, data]);

  // Input Handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  if (status === "pending") return <Spinner />;
  if (status === "error") {
    // constant variables
    const backendError = error as BackendError;
    const statusCode = backendError?.status_code ?? 500;
    const status = backendError?.status ?? "Internal server error";
    const message = backendError?.message ?? "An unknown error has occured";

    return (
      <ErrorPage
        code={statusCode}
        status={status}
        message={message}
      />
    )
  }
  if (status === "success") {
    return (
      <main className="min-h-screen w-full p-5 flex items-center justify-center">
        <Form onSubmit={mutate}>

          {/* FORM HEADER */}
          <FormHeader back="/account">
            <FormTitle>Edit Profile</FormTitle>
          </FormHeader>

          {/* FORM BODY */}
          <FormBody>

            {/* USERNAME INPUT */}
            <InputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                // value={form.username}
                onChange={handleInput}
                required={true}
                minLength={5}
                maxLength={50}
              />
            </InputContainer>

            {/* EMAIL INPUT */}
            <InputContainer>
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                required={true}
              />
            </InputContainer>

            {/* DIVIDER */}
            <div className="w-full h-px bg-gray-400"></div>

            {/* PARAGRAPH */}
            <p className="text-center text-xs text-[var(--text-primary)]">
              Please enter your password to save the changes.
            </p>

            {/* PASSWORD INPUT */}
            <InputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleInput}
                required={true}
                minLength={8}
              />
            </InputContainer>

          </FormBody>

          {/* SUBMIT BUTTON */}
          <SubmitButton
            disabled={
              !form.username ||
              !form.email ||
              !form.password ||
              isSameAsBefore ||
              isPending
            }
          >
            Save Changes
          </SubmitButton>
          
        </Form>
      </main>
    );
  }
}

export default EditProfile;
