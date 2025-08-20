import { Link } from "react-router";

// Form handling & validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { login } from "@/services/auth";
import { LoginSchema } from "@/schemas/auth";

// React-icons
import { FiUser, FiLock } from "react-icons/fi";
import { BiSolidLogInCircle } from "react-icons/bi";

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
document.title = "Login Page • Digital Guardians";

function Login() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(LoginSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { identifier, password } = errors;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={handleSubmit((form) => login(form, reset))}>

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

          {/* USERNAME/EMAIL FIELD */}
          <InputContainer>
            <Label htmlFor="identifier" required={true}>
              Username / Email Address
            </Label>
            <Input
              {...register("identifier")}
              icon={<FiUser className="text-2xl text-[var(--icons-primary)]" />}
              id="identifier"
              placeholder="Enter your username or email address"
            />
            <ErrorMessage>{identifier?.message}</ErrorMessage>
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
              placeholder="Enter your password to continue"
            />
            <ErrorMessage>{password?.message}</ErrorMessage>
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
        <SubmitButton disabled={!isValid || isSubmitting}>Login</SubmitButton>

      </Form>
    </main>
  );
}

export default Login;
