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
import { FaUserCircle } from "react-icons/fa";
import { FiUser, FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

// Rename the title
document.title = "Signup Page • Digital Guardians";

function Signup() {
  // Hooks
  const { signup } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      signup(form, setForm, event),
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
          <FaUserCircle className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Create a New Account</FormTitle>
          <FormDescription>
            Please create your account to get started
          </FormDescription>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* USERNAME INPUT */}
          <InputContainer>
            <Label htmlFor="username" required={true}>
              Username
            </Label>
            <Input
              icon={<FiUser className="text-2xl text-[var(--icons-primary)]" />}
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleInput}
              required={true}
              placeholder="Enter a unique username"
              minLength={5}
              maxLength={50}
            />
          </InputContainer>

          {/* EMAIL INPUT */}
          <InputContainer>
            <Label htmlFor="email" required={true}>
              E-mail
            </Label>
            <Input
              icon={
                <MdOutlineEmail className="text-2xl text-[var(--icons-primary)]" />
              }
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              required={true}
              placeholder="Enter your e-mail address"
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

          {/* LOGIN LINK */}
          <p className="text-center text-xs flex items-center justify-center gap-1.5">
            Already have an account?
            <Link to="/auth/login" className="text-blue-800 hover:underline">
              Login
            </Link>
          </p>

        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton
          disabled={
            !form.username || !form.email || !form.password || isPending
          }
        >
          Register
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default Signup;
