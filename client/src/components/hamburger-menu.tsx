import { Link } from "react-router";
import { IoClose } from "react-icons/io5";

// Props type for the Hamburger component
interface HamburgerProps {
  toggle: boolean;
  links: { text: string; href: string }[];
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function HamburgerMenu({ links, toggle, setToggle }: HamburgerProps) {
  return (
    <div
      style={toggle ? { right: "0" } : { right: "-100%" }}
      className="min-h-screen w-full fixed z-[9999] top-0 bg-[#00000099]"
    >
      {/* INNER CONTAINER */}
      <div
        style={toggle ? { right: "0" } : { right: "-100%" }}
        className="h-full max-w-lg w-full absolute z-10 top-0 bg-[var(--bg-primary)] transition-['right'] duration-500 delay-100"
      >
        {/* INNER NAVBAR */}
        <div className="h-20 w-full px-5 flex items-center justify-between bg-white shadow-md">
          <h2 className="text-[1.375rem] text-[var(--theme-primary)] font-medium font-['Bruno_Ace_SC',_'Impact',_'serif']">
            Digital Guardians
          </h2>
          <button
            onClick={() => setToggle(false)}
            className="text-2xl cursor-pointer text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
          >
            <IoClose />
          </button>
        </div>

        {/* LINKS CONTAINER */}
        <div className="w-full py-5 px-2.5 text-center text-[var(--text-secondary)] flex flex-col items-center gap-3.5">
          {links.map(({ text, href }, index) => (
            <Link
              key={index}
              to={href}
              className="w-[95%] p-5 bg-white rounded-xl transition-all hover:text-[var(--text-primary)] hover:shadow-[0_0_10px_#0000004D] hover:scale-105"
            >
              {text}
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default HamburgerMenu;
