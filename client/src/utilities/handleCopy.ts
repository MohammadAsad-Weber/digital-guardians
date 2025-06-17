import { toast } from "react-toastify";

const handleCopy = async (text: string) => {
  try {
    if (!text) {
      toast.error("The field is empty");
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    }
  } catch {
    toast.error("Failed to copy");
  }
};

export default handleCopy;
