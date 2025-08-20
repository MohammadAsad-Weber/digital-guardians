import { format } from "date-fns";
import { Link } from "react-router";

// Services & Types for User Data
import { getUser } from "@/services/account";
import { useQuery } from "@tanstack/react-query";
import type { UserData } from "@/types/response";

// Utility & Application data
import { BackendError } from "@/utilities";
import { accountLinks } from "@/data/constant";

// Layouts
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";

// Components
import Spinner from "@/components/spinner";
import ErrorPage from "@/components/error-page";

// Rename the title
document.title = "My Account • Digital Guardians";

function AccountPage() {
  // Fetch user data using React Query's `useQuery` hook
  const { status, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  // Pending state
  if (status === "pending") return <Spinner />;

  // Error stata
  if (status === "error") {
    const backendError = error as BackendError;
    return (
      <ErrorPage
        status={backendError.status}
        status_code={backendError.status_code}
        message={backendError.message}
      />
    );
  }
  // Success state
  if (status === "success") {
    const userData = data as UserData;
    const result = format(new Date(userData.createdAt), "MMMM yyyy");
    return (
      <>
        <Navbar />
        <main className="w-full flex items-center justify-center">
          <section className="max-w-80 w-full py-12 px-5 flex flex-col items-center justify-center gap-7.5 lg:max-w-screen-md lg:flex-row">

            {/* USER PROFILE CARD */}
            <div className="w-full py-7.5 px-5 flex flex-col items-center justify-center gap-3.5 bg-white rounded-3xl shadow-[0_0_10px_#00000040] lg:max-w-68">

              {/* AVATAR */}
              <div className="aspect-square h-32 text-7xl text-[var(--theme-primary)] font-medium flex items-center justify-center bg-[var(--theme-secondary)]/25 rounded-full">
                {userData.username.charAt(0).toUpperCase()}
              </div>

              {/* DETAILS */}
              <div className="w-full text-center">
                <h3 className="truncate text-xl font-medium">
                  {userData.username}
                </h3>
                <h5 className="truncate my-px text-sm text-[var(--text-secondary)]">
                  {userData.email}
                </h5>
                <p className="truncate text-xs text-[var(--text-tertiary)]">
                  Joined {result}
                </p>
              </div>

            </div>

            {/* MY ACCOUNT SETTING */}
            <div className="w-full flex flex-col items-center justify-center gap-2.5">
              {accountLinks.map(({ icon, href, text }, index) => (
                <Link
                  key={index}
                  to={href}
                  className="w-full py-3.5 px-5 flex items-center justify-start gap-3.5 cursor-pointer bg-white rounded-lg shadow-[0_0_8px_#00000040] transition-['scale'] hover:scale-105"
                >
                  {icon}
                  {text}
                </Link>
              ))}
            </div>

          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default AccountPage;
