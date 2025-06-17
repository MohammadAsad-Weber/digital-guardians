import { useEffect } from "react";
import useVerify from "@/hooks/useVerify";
import Spinner from "@/components/Spinner";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  // Hook
  const { loading, verify, authenticated } = useVerify();

  // Verify the user
  useEffect(() => {
    verify();
  }, [verify]);

  // Conditional Rendering
  if (loading) return <Spinner />;
  return authenticated ? <Outlet /> : <Navigate to="/auth/login" replace={true} />;
}

export default ProtectedRoute;
