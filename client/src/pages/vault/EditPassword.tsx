import { useParams } from "react-router";
import usePassword from "@/hooks/usePassword";
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
document.title = "Edit Password • Digital Guardians";

function EditPassword() {
  // Hooks
  const { id } = useParams();
  const { getPassword, updatePassword } = usePassword();
  const [form, setForm] = useState({
    siteURL: "",
    username: "",
    password: "",
  });
  const { status, data, error } = useQuery({
    queryKey: ["passwords", { id }],
    queryFn: () => getPassword(id ?? ""),
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      updatePassword(id ?? "", form, event),
  });

  // Sync form with fetched data
  useEffect(() => {
    if (data) {
      setForm({
        siteURL: data.siteURL,
        username: data.username,
        password: data.password,
      });
    }
  }, [data]);

  // Check if the password is same as before
  const isSameAsBefore = useMemo(() => {
    if (
      form.siteURL === data?.siteURL &&
      form.username === data?.username &&
      form.password === data?.password
    )
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
          <FormHeader back={`/vault/${id}`}>
            <FormTitle>Edit Password</FormTitle>
          </FormHeader>

          {/* FORM BODY */}
          <FormBody>

            {/* SITEURL INPUT */}
            <InputContainer>
              <Label htmlFor="siteURL">Site URL</Label>
              <Input
                type="url"
                id="siteURL"
                name="siteURL"
                value={form.siteURL}
                onChange={handleInput}
                required={true}
              />
            </InputContainer>

            {/* USERNAME INPUT */}
            <InputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={handleInput}
                required={true}
                minLength={5}
                maxLength={50}
              />
            </InputContainer>

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
              !form.siteURL ||
              !form.username ||
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

export default EditPassword;
