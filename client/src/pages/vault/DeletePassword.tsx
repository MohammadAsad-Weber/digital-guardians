import { useParams } from "react-router";
import usePassword from "@/hooks/usePassword";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";

// UI Components
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
  // Hooks
  const { id } = useParams();
  const { deletePassword } = usePassword();
  const { isPending, mutate } = useMutation({
    mutationFn: () => deletePassword(id ?? ""),
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
