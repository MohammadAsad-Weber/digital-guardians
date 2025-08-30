import { logout } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

// React-icons
import { PiWarningCircle } from "react-icons/pi";

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
document.title = "Logout • Digital Guardians";

function Logout() {
  // Initialize logout mutation hook
  const { isPending, mutate } = useMutation({ mutationFn: logout });

  return (
    <main className="min-h-screen w-full p-5 flex items-center justify-center form-pattern">
      <Modal>

        {/* MODAL CONTENT */}
        <ModalContent>
          <PiWarningCircle className="text-6xl text-red-400" />
          <ModalTitle>Are you leaving?</ModalTitle>
          <ModalDescription>
            Are you sure you want to logout? All your unsaved data will be lost
          </ModalDescription>
        </ModalContent>

        {/* MODAL ACTIONS */}
        <ModalActions>
          <ModalCancelAction to="/account">Stay Logged In</ModalCancelAction>
          <ModalProceedAction onClick={() => mutate()} disabled={isPending}>
            Yes, Log Out
          </ModalProceedAction>
        </ModalActions>
        
      </Modal>
    </main>
  );
}

export default Logout;
