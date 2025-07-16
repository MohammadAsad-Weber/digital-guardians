import { useState } from "react";
import useAuth from "@/hooks/useAuth";
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
import { FiUser } from "react-icons/fi";
import { FaCircleQuestion } from "react-icons/fa6";

// Rename the title
document.title = "Forgot Password • Digital Guardians";

function ForgotPassword() {
  // Hooks
  const { forgotPassword } = useAuth();
  const [userId, setUserId] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      forgotPassword(userId, setUserId, event),
  });

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form back="/auth/login" onSubmit={mutate}>

        {/* FORM HEADER */}
        <FormHeader>
          <FaCircleQuestion className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Forgot Password</FormTitle>
          <FormDescription>
            Enter your credentials to reset your password
          </FormDescription>
        </FormHeader>

        {/* FORM BODY ( USERNAME/EMAIL INPUT ) */}
        <FormBody>
          <InputContainer>
            <Label htmlFor="userId" required={true}>
              Username
            </Label>
            <Input
              icon={<FiUser className="text-2xl text-[var(--icons-primary)]" />}
              id="userId"
              name="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required={true}
              placeholder="Username or E-mail"
              minLength={5}
              maxLength={50}
            />
          </InputContainer>
        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!userId || isPending}>
          Send Reset Link
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default ForgotPassword;
