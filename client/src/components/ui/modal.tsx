import { Link } from "react-router";
import cn from "@/utilities/classname";

// Types
import {
  GeneralProps,
  CustomLinkProps,
  ButtonProps,
} from "@/components/ui/types";

// Components
export function Modal({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "max-w-sm w-full p-5 pt-7.5 relative flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040] animate-zoom-in",
        className
      )}
    >
      {children}
    </div>
  );
}
export function ModalContent({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full text-center flex flex-col items-center justify-center gap-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function ModalTitle({ children, className }: GeneralProps) {
  return (
    <h3
      className={cn(
        "text-lg font-medium text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </h3>
  );
}
export function ModalDescription({ children, className }: GeneralProps) {
  return (
    <p className={cn("text-sm text-[var(--text-secondary)]", className)}>
      {children}
    </p>
  );
}
export function ModalActions({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full text-center font-medium text-white flex items-center justify-center gap-3.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function ModalCancelAction({
  children,
  className,
  ...props
}: CustomLinkProps) {
  return (
    <Link
      className={cn(
        "w-full h-10 flex items-center justify-center cursor-pointer bg-[var(--theme-primary)] rounded-xl hover:bg-[var(--theme-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
export function ModalProceedAction({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full h-10 flex items-center justify-center cursor-pointer bg-red-500 rounded-xl hover:bg-red-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
