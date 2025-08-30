import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { changePassword } from "@/services/account";
import { ChangePasswordSchema } from "@/schemas/user";

// UI Form Components
import {
  Form,
  FormHeader,
  FormTitle,
  FormBody,
  InputContainer,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
} from "@/components/ui/form";

// Rename the title
document.title = "Change Password • Digital Guardians";

function ChangePassword() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { oldPassword, newPassword, confirmPassword } = errors;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center form-pattern">
      <Form onSubmit={handleSubmit((form) => changePassword(form, reset))}>

        {/* FORM HEADER */}
        <FormHeader backTo="/account">
          <FormTitle>Change Password</FormTitle>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* CURRENT PASSWORD FIELD */}
          <InputContainer
            className={
              oldPassword?.message ? "border-red-500" : "border-gray-500"
            }
          >
            <Label
              htmlFor="oldPassword"
              className={
                oldPassword?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              Current Password
            </Label>
            <Input
              {...register("oldPassword")}
              type="password"
              id="oldPassword"
              value={watch("oldPassword")}
            />
          </InputContainer>
          <ErrorMessage>{oldPassword?.message}</ErrorMessage>

          {/* NEW PASSWORD FIELD */}
          <InputContainer
            className={
              newPassword?.message ? "border-red-500" : "border-gray-500"
            }
          >
            <Label
              htmlFor="newPassword"
              className={
                newPassword?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              New Password
            </Label>
            <Input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              value={watch("newPassword")}
            />
          </InputContainer>
          <ErrorMessage>{newPassword?.message}</ErrorMessage>

          {/* CONFIRM PASSWORD FIELD */}
          <InputContainer
            className={
              confirmPassword?.message ? "border-red-500" : "border-gray-500"
            }
          >
            <Label
              htmlFor="confirmPassword"
              className={
                confirmPassword?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              Confirm Password
            </Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              value={watch("confirmPassword")}
            />
          </InputContainer>
          <ErrorMessage>{confirmPassword?.message}</ErrorMessage>

        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!isValid || isSubmitting}>
          Update Password
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default ChangePassword;
