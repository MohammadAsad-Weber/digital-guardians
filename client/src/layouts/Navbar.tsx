import { Link } from "react-router";
import { useMemo, useState } from "react";
import Hamburger from "@/components/Hamburger";
import { BiMenuAltRight } from "react-icons/bi";
import { authenticatedLinks, unauthenticatedLinks } from "@/data/constant";

function Navbar() {
  // Hook
  const [toggle, setToggle] = useState(false);

  // Links based on authentication
  const token = localStorage.getItem("access_token");
  const links = useMemo(() => {
    return token ? authenticatedLinks : unauthenticatedLinks;
  }, [token]);

  return (
    <header className="h-20 w-full px-5 text-[#E6E6E6] sticky z-50 top-0 flex items-center justify-center bg-[var(--theme-primary)] shadow-[0_4px_15px_#00000070] lg:px-10">

      {/* NAVBAR */}
      <nav className="h-full max-w-screen-xl w-full flex items-center justify-between">

        {/* TITLE WITH LINK */}
        <Link
          to="/"
          className="text-[1.375rem] font-medium font-['Bruno_Ace_SC',_'Impact'] cursor-pointer"
        >
          Digital Guardians
        </Link>

        {/* LINKS CONTAINER FOR SCREENS LARGER THAN 768px */}
        <div className="hidden text-sm items-center gap-4 md:flex lg:gap-5 xl:text-base">
          {links.map(({ text, href }, index) => {
            return (
              <Link key={index} to={href} className="hover:underline">
                {text}
              </Link>
            );
          })}
        </div>

        {/* HAMBURGER MENU TOGGLE BUTTON */}
        <button
          onClick={() => setToggle(true)}
          className="text-2xl cursor-pointer md:hidden"
        >
          <BiMenuAltRight />
        </button>
        
      </nav>

      {/* HAMBURGER MENU */}
      <Hamburger toggle={toggle} links={links} setToggle={setToggle} />

    </header>
  );
}

export default Navbar;
