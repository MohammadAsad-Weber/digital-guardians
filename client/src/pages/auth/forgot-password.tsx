import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { forgotPassword } from "@/services/auth";
import { ForgotPasswordSchema } from "@/schemas/auth";

// React-icons
import { FiUser } from "react-icons/fi";
import { FaCircleQuestion } from "react-icons/fa6";

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
document.title = "Forgot Password • Digital Guardians";

function ForgotPassword() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { identifier: "" },
    delayError: 150,
    mode: "all",
  });
  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center auth-pattern">
      <Form
        backTo="/auth/login"
        onSubmit={handleSubmit((form) => forgotPassword(form, reset))}
      >
        {/* FORM HEADER */}
        <FormHeader>
          <FaCircleQuestion className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Forgot Password</FormTitle>
          <FormDescription>
            Enter your credentials to reset your password
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
              placeholder="Username / Email linked to your account"
            />
            <ErrorMessage>{errors.identifier?.message}</ErrorMessage>
          </InputContainer>
          
        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!isValid || isSubmitting}>
          Send Reset Link
        </SubmitButton>

      </Form>
    </main>
  );
}

export default ForgotPassword;
