import React, { useState } from "react";
import useAccount from "@/hooks/useAccount";
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
document.title = "Change Password • Digital Guardians";

function ChangePassword() {
  // Hooks
  const { changePassword } = useAccount();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      changePassword(form, setForm, event),
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
        <FormHeader back="/account">
          <FormTitle>Change Password</FormTitle>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* USERNAME INPUT */}
          <InputContainer>
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleInput}
              required={true}
              minLength={8}
            />
          </InputContainer>

          {/* USERNAME INPUT */}
          <InputContainer>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              onChange={handleInput}
              required={true}
              minLength={8}
            />
          </InputContainer>

          {/* USERNAME INPUT */}
          <InputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInput}
              required={true}
              minLength={8}
            />
          </InputContainer>
          
        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton
          disabled={
            !form.oldPassword ||
            !form.newPassword ||
            !form.confirmPassword ||
            isPending
          }
        >
          Update Password
        </SubmitButton>

      </Form>
    </main>
  );
}

export default ChangePassword;
