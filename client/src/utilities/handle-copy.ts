import { toast } from "react-toastify";

// Copies the given text to the clipboard and shows toast notifications
const handleCopy = async (text: string) => {
  try {
    if (!text) toast.error("There is no content available for copying");
    else {
      await navigator.clipboard.writeText(text);
      toast.success("Content has been successfully copied");
    }
  } catch {
    toast.error("Content could not be copied");
  }
};

export default handleCopy;
