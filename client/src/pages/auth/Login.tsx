import { useState } from "react";
import { Link } from "react-router";
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
import { FiUser, FiLock } from "react-icons/fi";
import { BiSolidLogInCircle } from "react-icons/bi";

// Rename the title
document.title = "Login Page • Digital Guardians";

function Login() {
  // Hooks
  const { login } = useAuth();
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      login(form, setForm, event),
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
        <FormHeader>
          <BiSolidLogInCircle className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Welcome Back</FormTitle>
          <FormDescription>
            Please enter your credentials to login
          </FormDescription>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* USERNAME/EMAIL INPUT */}
          <InputContainer>
            <Label htmlFor="userId" required={true}>
              Username
            </Label>
            <Input
              icon={<FiUser className="text-2xl text-[var(--icons-primary)]" />}
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleInput}
              required={true}
              placeholder="Username or E-mail"
              minLength={5}
              maxLength={50}
            />
          </InputContainer>

          {/* PASSWORD INPUT */}
          <InputContainer>
            <Label htmlFor="password" required={true}>
              Password
            </Label>
            <Input
              icon={<FiLock className="text-2xl text-[var(--icons-primary)]" />}
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInput}
              required={true}
              placeholder="Enter your password"
              minLength={8}
            />
          </InputContainer>

          {/* LINKS */}
          <div className="px-1.5 w-full flex items-center justify-between gap-3.5">
            <p className="text-xs flex items-center justify-between gap-1.5">
              Don't have an account?
              <Link to="/auth/signup" className="text-blue-800 hover:underline">
                Signup
              </Link>
            </p>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-blue-800 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!form.userId || !form.password || isPending}>
          Login
        </SubmitButton>

      </Form>
    </main>
  );
}

export default Login;
