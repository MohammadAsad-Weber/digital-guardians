import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

// Component & Utility
import { verify } from "@/utilities";
import Spinner from "@/components/spinner";

function ProtectedRoute() {
  // States to track loading and authentication
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Verify user authentication on mount and prevent state updates if unmounted
  useEffect(() => {
    // Prevent updating state if component unmounts
    let isMounted = true;

    // Async function to verify authentication
    const checkAuth = async () => {
      try {
        const { isLoading, isAuthenticated } = await verify();
        if (isMounted) {
          setAuthenticated(isAuthenticated);
          setLoading(isLoading);
        }
      } catch {
        if (isMounted) {
          setAuthenticated(false);
          setLoading(false);
        }
      }
    };

    // Run the authentication check
    checkAuth();

    // Cleanup function to avoid setting state on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Show spinner while loading authentication status
  if (loading) return <Spinner />;

  // If authenticated, render nested routes
  // Otherwise, redirect to login page
  return authenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;
