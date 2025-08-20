import { useMemo } from "react";
import { Link } from "react-router";
import useDebounce from "@/hooks/debounce-search";

// React Query & Application service
import { useQuery } from "@tanstack/react-query";
import { getPasswords } from "@/services/password";

// Utilities & Helper Functions
import { mergeClassNames } from "@/libs";
import { BackendError, createRefreshHandler } from "@/utilities";

// React-icons
import { SlRefresh } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";

// Layouts
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";

// Component
import SkeletonCard from "@/components/skeleton-card";
import PasswordCard from "@/components/password-card";

// Rename the title
document.title = "Vault • Digital Guardians";

function VaultPage() {
  // state and data fetching hooks
  const [query, debounceQuery, handleSearch, handleClear] = useDebounce();
  const { status, data, refetch, error } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
  });

  // compute filtered list of passwords based on search query
  const passwords = useMemo(() => {
    if (!debounceQuery) return data;
    return data
      ? data.filter((password) => password.siteURL.includes(debounceQuery))
      : undefined;
  }, [data, debounceQuery]);

  // refresh button handler with status notifications
  const handleRefresh = createRefreshHandler(
    {
      loading: "Updating password list",
      success: "Password list updated successfully",
    },
    refetch
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full py-12 px-5 flex flex-col items-center gap-10">

          {/* HEADER */}
          <div className="max-w-screen-md w-full flex flex-col items-center justify-center gap-3.5 md:flex-row md:justify-between">

            {/* PASSWORD COUNT */}
            <h3 className="text-xl">{`${
              passwords?.length ?? 0
            } sites and apps`}</h3>

            {/* SEARCH BAR */}
            <div className="max-w-85 w-full flex items-center justify-between gap-2.5 border-b border-gray-500">
              <IoMdSearch className="text-2xl text-[var(--icon-secondary)]" />
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search passwords"
                className="w-full pb-1.5 outline-none"
              />
              <button
                onClick={handleClear}
                className="text-2xl text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--icon-primary)]"
              >
                <IoClose />
              </button>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="w-fit text-sm text-white flex items-center justify-center gap-3.5">
            <Link
              to="/vault/create-password"
              className="h-12 px-5 flex items-center justify-center gap-2.5 bg-[var(--theme-primary)] cursor-pointer rounded-xl hover:bg-[var(--theme-secondary)]"
            >
              <IoAddCircleOutline size="1.5rem" />
              Create
            </Link>
            <button
              onClick={handleRefresh}
              className="h-12 px-5 flex items-center justify-center gap-2.5 bg-[var(--theme-primary)] cursor-pointer rounded-xl hover:bg-[var(--theme-secondary)]"
            >
              <SlRefresh size="1.4rem" />
              Refresh
            </button>
          </div>

          {/* PENDING STATE */}
          {status === "pending" && (
            <div className="w-fit grid grid-cols-1 gap-5 min-[740px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <SkeletonCard key={num} />
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {status === "error" && (
            <h2
              className={mergeClassNames(
                "text-center text-2xl font-bold flex items-center justify-center",
                (error as BackendError).status_code === 404
                  ? "text-[var(--text-default)]"
                  : "text-red-500"
              )}
            >
              {(error as BackendError).status_code === 404 ? (
                <>
                  You have no saved passwords
                  <br />
                  Add a new one to get started
                </>
              ) : (
                error.message
              )}
            </h2>
          )}

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="w-fit grid grid-cols-1 gap-5 min-[740px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {passwords?.map((data) => (
                <PasswordCard key={data._id} id={data._id} url={data.siteURL} />
              ))}
            </div>
          )}
          
        </section>
      </main>
      <Footer />
    </>
  );
}

export default VaultPage;
