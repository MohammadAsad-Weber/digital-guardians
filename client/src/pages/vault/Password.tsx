import { useState } from "react";
import usePassword from "@/hooks/usePassword";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import BackendError from "@/utilities/BackendError";

// Utility functions
import getFavicon from "@/utilities/getFavicon";
import handleCopy from "@/utilities/handleCopy";

// React-icons
import { FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// Components
import Spinner from "@/components/Spinner";
import ErrorPage from "@/components/ErrorPage";

function Password() {
  // Hooks
  const { id } = useParams();
  const { getPassword } = usePassword();
  const [toggle, setToggle] = useState(false);
  const { status, data, error } = useQuery({
    queryKey: ["passwords", { id }],
    queryFn: () => getPassword(id ?? ""),
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
    const website = new URL(data.siteURL);
    const favicon = getFavicon(website.hostname);

    return (
      <main className="min-h-screen w-full p-5 flex items-center justify-center">
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
            <img
              src={favicon}
              alt={`Favicon of ${website.hostname}`}
              className="aspect-square h-10"
            />
            <div className="truncate leading-0">
              <h3 className="truncate text-lg font-medium">
                {website.hostname}
              </h3>
              <a
                href={website.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:underline"
              >
                {website.origin}
              </a>
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-full flex flex-col items-center justify-center gap-2.5">

            {/* USERNAME */}
            <div className="w-full py-3 px-3.5 flex flex-col gap-0.5 bg-gray-200/70 rounded-xl">
              <span className="text-sm text-[var(--text-secondary)]">
                Username
              </span>
              <div className="w-full flex items-center justify-between gap-3.5">
                <p
                  style={{ scrollbarWidth: "none" }}
                  className="w-full text-[var(--text-primary)] text-nowrap overflow-x-auto"
                >
                  {data.username}
                </p>
                <button
                  onClick={() => handleCopy(data.username)}
                  className="text-xl text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--icon-primary)]"
                >
                  <FiCopy />
                </button>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="w-full py-3 px-3.5 flex flex-col gap-0.5 bg-gray-200/70 rounded-xl">
              <span className="text-sm text-[var(--text-secondary)]">
                Password
              </span>
              <div className="w-full flex items-center justify-between gap-3.5">
                <p
                  style={
                    toggle
                      ? { filter: "blur(0px)", scrollbarWidth: "none" }
                      : { filter: "blur(5px)", scrollbarWidth: "none" }
                  }
                  className="w-full text-[var(--text-primary)] text-nowrap overflow-x-auto"
                >
                  {data.password}
                </p>
                <div className="text-[var(--icon-secondary)] flex items-center gap-2.5">
                  <button
                    onClick={() => setToggle((val) => !val)}
                    className="text-[1.75rem] cursor-pointer hover:text-[var(--icon-primary)]"
                  >
                    {toggle ? <VscEyeClosed /> : <VscEye />}
                  </button>
                  <button
                    onClick={() => handleCopy(data.password)}
                    className="text-xl cursor-pointer hover:text-[var(--icon-primary)]"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* BUTTON (LINKS) */}
          <div className="w-full text-center font-medium text-white flex items-center justify-center gap-3.5">
            <Link
              to={`/vault/edit-password/${data._id}`}
              className="w-full h-12 flex items-center justify-center cursor-pointer bg-[var(--theme-primary)] rounded-xl hover:bg-[var(--theme-secondary)]"
            >
              Edit
            </Link>
            <Link
              to={`/vault/delete-password/${data._id}`}
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
