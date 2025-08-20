import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Application services & schemas
import { createPassword } from "@/services/password";
import { CreatePasswordSchema } from "@/schemas/password";

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
document.title = "Create Password • Digital Guardians";

function CreatePassword() {
  // Initialize form with validation and defaults
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(CreatePasswordSchema),
    delayError: 150,
    mode: "all",
    defaultValues: {
      siteURL: "",
      username: "",
      password: "",
    },
  });

  // Extract useful states from form
  const { isValid, isSubmitting, errors } = formState;
  const { siteURL, username, password } = errors;

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={handleSubmit((form) => createPassword(form, reset))}>

        {/* FORM HEADER */}
        <FormHeader backTo="/vault">
          <FormTitle>Create Password</FormTitle>
        </FormHeader>

        {/* FORM BODY */}
        <FormBody>

          {/* SITEURL FIELD */}
          <InputContainer
            className={siteURL?.message ? "border-red-500" : "border-gray-500"}
          >
            <Label
              htmlFor="siteURL"
              className={
                siteURL?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              Site URL
            </Label>
            <Input {...register("siteURL")} type="url" id="siteURL" />
          </InputContainer>
          <ErrorMessage>{siteURL?.message}</ErrorMessage>

          {/* USERNAME FIELD */}
          <InputContainer
            className={username?.message ? "border-red-500" : "border-gray-500"}
          >
            <Label
              htmlFor="username"
              className={
                username?.message
                  ? "text-red-500"
                  : "text-[var(--text-secondary)]"
              }
            >
              Username
            </Label>
            <Input {...register("username")} id="username" />
          </InputContainer>
          <ErrorMessage>{username?.message}</ErrorMessage>

          {/* PASSWORD FIELD */}
          <InputContainer
            className={password?.message ? "border-red-500" : "border-gray-500"}
          >
            <Label
              htmlFor="password"
              className={
                password?.message
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
          <ErrorMessage>{password?.message}</ErrorMessage>

        </FormBody>

        {/* SUBMIT BUTTON */}
        <SubmitButton disabled={!isValid || isSubmitting}>
          Create Password
        </SubmitButton>
        
      </Form>
    </main>
  );
}

export default CreatePassword;
