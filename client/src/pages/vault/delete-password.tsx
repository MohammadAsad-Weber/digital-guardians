import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { deletePassword } from "@/services/password";

// React-icons
import { RiDeleteBinLine } from "react-icons/ri";

// UI Modal Components
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalActions,
  ModalCancelAction,
  ModalProceedAction,
} from "@/components/ui/modal";

// Rename the title
document.title = "Delete Password • Digital Guardians";

function DeletePassword() {
  // Retrieve password ID from route parameters
  const { id } = useParams<{ id: string }>();

  // Configure delete password mutation with loading state tracking
  const { isPending, mutate } = useMutation({
    mutationFn: () => deletePassword(id as string),
  });

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center">
      <Modal>

        {/* MODAL CONTENT */}
        <ModalContent>
          <RiDeleteBinLine className="text-6xl text-red-400" />
          <ModalTitle>Delete Password</ModalTitle>
          <ModalDescription>
            You're going to delete the password. Are you sure?
          </ModalDescription>
        </ModalContent>

        {/* MODAL ACTIONS */}
        <ModalActions>
          <ModalCancelAction to={`/vault/${id}`}>No, Keep It</ModalCancelAction>
          <ModalProceedAction onClick={() => mutate()} disabled={isPending}>
            Yes, Delete
          </ModalProceedAction>
        </ModalActions>

      </Modal>
    </main>
  );
}

export default DeletePassword;
