import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import getFavicon from "@/utilities/getFavicon";

// Interface
interface PasswordCardProps {
  id: string;
  url: string;
}
function PasswordCard({ id, url }: PasswordCardProps) {
  // constant variables
  const website = new URL(url);
  const favicon = getFavicon(website.hostname);

  return (
    <Link
      to={`/vault/${id}`}
      className="group w-85 py-3.5 px-5 flex items-center justify-between gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000050] transition-['scale'] hover:scale-105"
    >
      {/* CARD DETAILS */}
      <div className="w-full truncate flex items-center justify-start gap-3.5">
        <img
          src={favicon}
          alt={`Favicon of ${website.hostname}`}
          loading="lazy"
          className="aspect-square h-10 w-10"
        />
        <h4 className="truncate lowercase">{website.hostname}</h4>
      </div>

      {/* CHEVRON ICON */}
      <FaChevronRight className="text-[var(--icon-secondary)] group-hover:text-[var(--icon-primary)]" />
    </Link>
  );
}

export default PasswordCard;
