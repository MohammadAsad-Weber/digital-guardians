import { useState } from "react";
import { Link, useParams } from "react-router";

// Services & Types for Password Data
import { useQuery } from "@tanstack/react-query";
import { getPassword } from "@/services/password";
import type { PasswordData } from "@/types/response";

// Utilities & Helper Functions
import { mergeClassNames } from "@/libs";
import { BackendError, getFavicon, handleCopy } from "@/utilities";

// React-icons
import { FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// Components
import Spinner from "@/components/spinner";
import ErrorPage from "@/components/error-page";

function Password() {
  // Extract route parameter
  const { id } = useParams<{ id: string }>();

  // State for password visibility toggle
  const [toggle, setToggle] = useState(false);

  // Fetch password data
  const { status, data, error } = useQuery({
    queryKey: ["passwords", { id }],
    queryFn: () => getPassword(id as string),
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
    const passwordData = data as PasswordData;
    const website = new URL(passwordData.siteURL);
    return (
      <main className="min-h-screen w-full p-5 flex items-center justify-center form-pattern">
        <div className="max-w-md w-full p-5 pt-7.5 relative flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040] animate-zoom-out">

          {/* CLOSE BUTTON */}
          <Link
            to="/vault"
            className="absolute top-3.5 right-3.5 text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
          >
            <IoClose size="1.5rem" />
          </Link>

          {/* TITLE */}
          <div className="w-full flex items-center justify-start gap-3.5">

            {/* LOGO */}
            <img
              src={getFavicon(website.hostname)}
              alt={`Favicon of ${website.hostname}`}
              className="aspect-square h-10"
            />

            {/* ORIGIN AND LINK */}
            <div className="truncate leading-0">
              <h3 className="truncate text-lg font-medium">
                {website.hostname}
              </h3>
              <Link
                to={website.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:underline"
              >
                {website.origin}
              </Link>
            </div>
            
          </div>

          {/* DETAILS */}
          <div className="w-full flex flex-col items-center justify-center gap-2.5">

            {/* USERNAME FIELD */}
            <div className="w-full py-3 px-3.5 flex flex-col gap-0.5 bg-gray-200/70 rounded-xl">
              <label className="text-sm text-[var(--text-secondary)]">
                Username
              </label>
              <div className="w-full flex items-center justify-between gap-3.5">
                <input
                  type="text"
                  readOnly
                  value={passwordData.username}
                  className="w-full text-[var(--text-primary)] outline-none"
                />
                <button
                  onClick={() => handleCopy(passwordData.username)}
                  className="text-xl text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--icon-primary)]"
                >
                  <FiCopy />
                </button>
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="w-full py-3 px-3.5 flex flex-col gap-0.5 bg-gray-200/70 rounded-xl">
              <label className="text-sm text-[var(--text-secondary)]">
                Password
              </label>
              <div className="w-full flex items-center justify-between gap-3.5">
                <input
                  type="text"
                  readOnly
                  value={passwordData.password}
                  className={mergeClassNames(
                    "w-full text-[var(--text-primary)] outline-none",
                    toggle ? "blur-none" : "blur-xs"
                  )}
                />
                <div className="text-[var(--icon-secondary)] flex items-center gap-2.5">
                  <button
                    onClick={() => setToggle((val) => !val)}
                    className="text-[1.75rem] cursor-pointer hover:text-[var(--icon-primary)]"
                  >
                    {toggle ? <VscEyeClosed /> : <VscEye />}
                  </button>
                  <button
                    onClick={() => handleCopy(passwordData.password)}
                    className="text-xl cursor-pointer hover:text-[var(--icon-primary)]"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* LINKS */}
          <div className="w-full text-center font-medium text-white flex items-center justify-center gap-3.5">
            <Link
              to={`/vault/edit-password/${passwordData._id}`}
              className="w-full h-12 flex items-center justify-center cursor-pointer bg-[var(--theme-primary)] rounded-xl hover:bg-[var(--theme-secondary)]"
            >
              Edit
            </Link>
            <Link
              to={`/vault/delete-password/${passwordData._id}`}
              className="w-full h-12 flex items-center justify-center cursor-pointer bg-red-500 rounded-xl hover:bg-red-400"
            >
              Delete
            </Link>
          </div>

        </div>
      </main>
    );
  }
}

export default Password;
