import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { signup } from "@/services/auth";
import { SignupSchema } from "@/schemas/auth";

// React-icons
import { FaUserCircle } from "react-icons/fa";
import { FiUser, FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

// UI Auth Form Components
import {
  Form,
  FormHeader,
  FormTitle,
  FormDescription,
  FormBody,
  InputContainer,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
} from "@/components/ui/auth-form";

// Rename the title
document.title = "Signup Page • Digital Guardians";

function Signup() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(SignupSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  
  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { username, email, password } = errors;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={handleSubmit((form) => signup(form, reset))}>
      
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

          {/* USERNAME FIELD */}
          <InputContainer>
            <Label htmlFor="username" required={true}>
              Username
            </Label>
            <Input
              {...register("username")}
              icon={<FiUser className="text-2xl text-[var(--icons-primary)]" />}
              id="username"
              placeholder="Enter your desired username"
            />
            <ErrorMessage>{username?.message}</ErrorMessage>
          </InputContainer>

          {/* EMAIL FIELD */}
          <InputContainer>
            <Label htmlFor="email" required={true}>
              Email Address
            </Label>
            <Input
              {...register("email")}
              icon={<MdOutlineEmail className="text-2xl text-[var(--icons-primary)]" />}
              type="email"
              id="email"
              placeholder="Enter your email address"
            />
            <ErrorMessage>{email?.message}</ErrorMessage>
          </InputContainer>

          {/* PASSWORD FIELD */}
          <InputContainer>
            <Label htmlFor="password" required={true}>
              Password
            </Label>
            <Input
              {...register("password")}
              icon={<FiLock className="text-2xl text-[var(--icons-primary)]" />}
              type="password"
              id="password"
              value={watch("password")}
              placeholder="Create a secure password"
            />
            <ErrorMessage>{password?.message}</ErrorMessage>
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
        <SubmitButton disabled={!isValid || isSubmitting}>
          Register
        </SubmitButton>

      </Form>
    </main>
  );
}

export default Signup;
