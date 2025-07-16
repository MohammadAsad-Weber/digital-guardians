import { useState } from "react";
import usePassword from "@/hooks/usePassword";
import { useMutation } from "@tanstack/react-query";

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

// Rename the title
document.title = "Create Password • Digital Guardians";

function CreatePassword() {
  // Hooks
  const { createPassword } = usePassword();
  const [form, setForm] = useState({
    siteURL: "",
    username: "",
    password: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      createPassword(form, setForm, event),
  });

  // Input Handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={mutate}>

        {/* FORM HEADER */}
        <FormHeader back="/vault">
          <FormTitle>Create Password</FormTitle>
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
            !form.siteURL || !form.username || !form.password || isPending
          }
        >
          Create Password
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default CreatePassword;
