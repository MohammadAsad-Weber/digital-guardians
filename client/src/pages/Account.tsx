import { Link } from "react-router";
import useAccount from "@/hooks/useAccount";
import { accountLinks } from "@/data/constant";
import { useQuery } from "@tanstack/react-query";
import Profile from "@/assets/images/profile.jpg";
import BackendError from "@/utilities/BackendError";

// Layouts
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

// Components
import Spinner from "@/components/Spinner";
import ErrorPage from "@/components/ErrorPage";

// Rename the title
document.title = "My Account • Digital Guardians";

function Account() {
  // Hooks
  const { getUser } = useAccount();
  const { status, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") {
    // constant variables
    const backendError = error as BackendError;
    const statusCode = backendError?.status_code ?? 500;
    const status = backendError?.status ?? "Internal server error";
    const message = backendError?.message ?? "An unknown error has occured";

    return (
      <ErrorPage
        code={statusCode}
        status={status}
        message={message}
      />
    )
  }
  if (data) {
    // constant variables
    const createdAt = new Date(data.createdAt);
    const month = createdAt.toLocaleString("default", { month: "long" });
    const year = createdAt.getFullYear();

    return (
      <>
        <Navbar />
        <main className="w-full flex items-center justify-center">
          <section className="max-w-80 w-full py-12 px-5 flex flex-col items-center justify-center gap-7.5 lg:max-w-screen-md lg:flex-row">
            
            {/* USER PROFILE CARD */}
            <div className="w-full py-7.5 px-5 flex flex-col items-center justify-center gap-3.5 bg-white rounded-3xl shadow-[0_0_10px_#00000040] lg:max-w-68">
              <img
                src={Profile}
                alt="Default Profile Picture"
                className="aspect-square max-h-32 h-full rounded-full"
              />
              <div className="w-full text-center">
                <h3 className="truncate text-xl font-medium">
                  {data.username}
                </h3>
                <h5 className="truncate my-px text-sm text-[var(--text-secondary)]">
                  {data.email}
                </h5>
                <p className="truncate text-xs text-[var(--text-tertiary)]">
                  Joined {month} {year}
                </p>
              </div>
            </div>

            {/* MY ACCOUNT SETTING */}
            <div className="w-full flex flex-col items-center justify-center gap-2.5">
              {accountLinks.map(({ icon, href, text }, index) => {
                return (
                  <Link
                    key={index}
                    to={href}
                    className="w-full py-3.5 px-5 flex items-center justify-start gap-3.5 cursor-pointer bg-white rounded-lg shadow-[0_0_8px_#00000040] transition-['scale'] hover:scale-105"
                  >
                    {icon}
                    {text}
                  </Link>
                );
              })}
            </div>

          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Account;
