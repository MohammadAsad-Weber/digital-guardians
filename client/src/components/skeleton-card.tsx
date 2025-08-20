import { FaChevronRight } from "react-icons/fa6";

function SkeletonCard() {
  return (
    <div className="group w-85 py-3.5 px-5 flex items-center justify-between gap-5 bg-white cursor-pointer rounded-2xl shadow-[0_0_10px_#00000050] transition-['scale'] hover:scale-105">
      <div className="w-full flex items-center justify-start gap-3.5">
        <div className="aspect-square h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <FaChevronRight className="text-[var(--icon-secondary)] group-hover:text-[var(--icon-primary)]" />
    </div>
  );
}

export default SkeletonCard;
