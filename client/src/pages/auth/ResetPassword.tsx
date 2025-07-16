import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useParams } from "react-router";
import ErrorPage from "@/components/ErrorPage";
import { useMutation } from "@tanstack/react-query";

// UI Components
import {
  Form,
  FormHeader,
  FormTitle,
  FormDescription,
  FormBody,
  InputContainer,
  Input,
  Label,
  SubmitButton,
} from "@/components/ui/auth-form";

// React-icons
import { FiLock } from "react-icons/fi";
import { IoFingerPrintSharp } from "react-icons/io5";

// Rename the title
document.title = "Reset Password • Digital Guardians";

function ResetPassword() {
  // Hooks
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      resetPassword(token ?? "", password, setPassword, event),
  });

  if (!token) return <ErrorPage message="The password reset link is invalid or has expired" />;
  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={mutate}>

        {/* FORM HEADER */}
        <FormHeader>
          <IoFingerPrintSharp className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Reset Password</FormTitle>
          <FormDescription>
            Enter your new password below to secure your account
          </FormDescription>
        </FormHeader>

        {/* FORM BODY ( PASSWORD INPUT ) */}
        <FormBody>
          <InputContainer>
            <Label htmlFor="password" required={true}>
              Password
            </Label>
            <Input
              icon={<FiLock className="text-2xl text-[var(--icons-primary)]" />}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required={true}
              placeholder="Enter your new password"
              minLength={8}
            />
          </InputContainer>
        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!password || isPending}>
          Send Reset Link
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default ResetPassword;
