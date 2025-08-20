import { useEffect } from "react";
import { setNavigate } from "@/libs";
import { useNavigate } from "react-router";

// Props type for the NavigateProvider component
interface NavigateProviderProps {
  children?: React.ReactNode;
}
function NavigateProvider({ children }: NavigateProviderProps) {
  // Get navigate function from React Router
  const navigate = useNavigate();

  // Store navigate globally when component mounts or navigate changes
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return children;
}

export default NavigateProvider;
