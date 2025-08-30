import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { resetPassword } from "@/services/auth";
import { ResetPasswordSchema } from "@/schemas/auth";

// React-icons
import { FiLock } from "react-icons/fi";
import { IoFingerPrintSharp } from "react-icons/io5";

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
document.title = "Reset Password • Digital Guardians";

function ResetPassword() {
  // Extract "token" from URL params
  const { token } = useParams<{ token: string }>();

  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: "" },
    delayError: 150,
    mode: "all",
  });
  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center auth-pattern">
      <Form
        backTo="/auth/login"
        onSubmit={handleSubmit((form) => resetPassword(token as string, form, reset))}
      >
        {/* FORM HEADER */}
        <FormHeader>
          <IoFingerPrintSharp className="mb-2.5 text-5xl text-[var(--theme-primary)]" />
          <FormTitle>Reset Password</FormTitle>
          <FormDescription>
            Enter your new password below to secure your account
          </FormDescription>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* NEW PASSWORD FIELD */}
          <InputContainer>
            <Label htmlFor="newPassword" required={true}>
              New Password
            </Label>
            <Input
              {...register("newPassword")}
              icon={<FiLock className="text-2xl text-[var(--icons-primary)]" />}
              type="password"
              id="newPassword"
              value={watch("newPassword")}
              placeholder="Enter a strong new password"
            />
            <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
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

export default ResetPassword;
