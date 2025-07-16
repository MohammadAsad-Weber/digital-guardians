import { Link } from "react-router";
import { toast } from "react-toastify";
import usePassword from "@/hooks/usePassword";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";

// React-icons
import { SlRefresh } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";

// Layouts
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

// Component
import SkeletonCard from "@/components/SkeletonCard";
import PasswordCard from "@/components/PasswordCard";

// Rename the title
document.title = "Vault • Digital Guardians";

function Vault() {
  // Hooks
  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [query, setQuery] = useState("");
  const { getPasswords } = usePassword();
  const { status, data, refetch, error } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
  });

  // useMemo to extract filtered passwords
  const passwords = useMemo(() => {
    if (!data) return [];
    if (!debouncedQuery) return data;
    return data.filter((password) => password.siteURL.includes(debouncedQuery));
  }, [data, debouncedQuery]);

  // Handlers
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setQuery(value);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      const normalizedValue = value.toLowerCase();
      setDebouncedQuery(normalizedValue);
    }, 300);
  };
  const handleClear = () => {
    setQuery("");
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setDebouncedQuery("");
  };
  const handleRefresh = async () => {
    const toastId = toast.loading("Refreshing passwords");
    try {
      await refetch({ throwOnError: true });
      toast.update(toastId, {
        render: "Refreshed successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch {
      toast.update(toastId, {
        render: "Failed to refresh passwords",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full py-12 px-5 flex flex-col items-center gap-10">

          {/* PASSWORDS LENGTH & SEARCH BAR */}
          <div className="max-w-screen-md w-full flex flex-col items-center justify-center gap-3.5 md:flex-row md:justify-between">
            <h3 className="text-xl">{`${passwords.length} sites and apps`}</h3>
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

          {/* CONDITIONAL RENDERING */}
          {status === "pending" && (
            <div className="w-fit grid grid-cols-1 gap-5 min-[740px]:grid-cols-2 min-[1100px]:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          {status === "error" && (
            <h2 className="text-center text-2xl font-bold text-red-500 flex items-center justify-center">
              {error.message}
            </h2>
          )}
          {status === "success" &&
            (passwords.length > 0 ? (
              <div className="w-fit grid grid-cols-1 gap-5 min-[740px]:grid-cols-2 min-[1100px]:grid-cols-3">
                {passwords.map((data) => {
                  return (
                    <PasswordCard
                      key={data._id}
                      id={data._id}
                      url={data.siteURL}
                    />
                  );
                })}
              </div>
            ) : (
              <h2 className="text-center text-2xl font-bold flex items-center justify-center">
                You have no saved passwords.
                <br />
                Add a new one to get started.
              </h2>
            ))}
            
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Vault;
