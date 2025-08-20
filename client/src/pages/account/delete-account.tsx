import { Link } from "react-router";
import { IoClose } from "react-icons/io5";

// Form handling & validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { deleteUser } from "@/services/account";
import { DeleteUserSchema } from "@/schemas/user";

// UI Form Components
import {
  Form,
  FormTitle,
  FormBody,
  InputContainer,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
} from "@/components/ui/form";

// Rename the title
document.title = "Delete Account • Digital Guardians";

function DeleteAccount() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(DeleteUserSchema),
    defaultValues: { password: "" },
    delayError: 150,
    mode: "all",
  });

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form
        onSubmit={handleSubmit((form) => deleteUser(form, reset))}
        className="relative"
      >
        {/* CLOSE BUTTON */}
        <Link
          to="/account"
          className="absolute top-3.5 right-3.5 text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
        >
          <IoClose size="1.5rem" />
        </Link>

        {/* HEADER */}
        <div className="w-full text-center flex flex-col items-center justify-center gap-1.5">
          <FormTitle>Delete Account</FormTitle>
          <p className="text-sm text-[var(--text-secondary)]">
            Deleting your account will remove all of your information from our
            database.
          </p>
        </div>

        {/* FORM BODY */}
        <FormBody className="items-start">

          {/* DESCRIPTION */}
          <p className="text-[var(--text-primary)]">
            Enter your password to confirm.
          </p>

          {/* PASSWORD FIELD */}
          <InputContainer
            className={
              formState.errors.password?.message
                ? "border-red-500"
                : "border-gray-500"
            }
          >
            <Label
              htmlFor="password"
              className={
                formState.errors.password?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              Password
            </Label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              value={watch("password")}
            />
          </InputContainer>
          <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>

        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!formState.isValid || formState.isSubmitting}>
          Delete Account
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default DeleteAccount;
