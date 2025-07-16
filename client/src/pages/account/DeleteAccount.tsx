import { useState } from "react";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";
import useAccount from "@/hooks/useAccount";
import { useMutation } from "@tanstack/react-query";

// UI Components
import {
  Form,
  FormTitle,
  FormBody,
  InputContainer,
  Label,
  Input,
  SubmitButton,
} from "@/components/ui/form";

// Rename the title
document.title = "Delete Account • Digital Guardians";

function DeleteAccount() {
  // Hooks
  const { deleteAccount } = useAccount();
  const [password, setPassword] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: (event: React.FormEvent<HTMLFormElement>) =>
      deleteAccount(password, setPassword, event),
  });

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Form onSubmit={mutate} className="relative">

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

          {/* PASSWORD INPUT */}
          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required={true}
              minLength={8}
            />
          </InputContainer>
          
        </FormBody>

        <SubmitButton disabled={!password || isPending}>
          Delete Account
        </SubmitButton>

      </Form>
    </main>
  );
}

export default DeleteAccount;
