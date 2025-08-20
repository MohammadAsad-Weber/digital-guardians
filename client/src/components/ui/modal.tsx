import { mergeClassNames } from "@/libs";
import { Link, type LinkProps } from "react-router";

// Type Definitions
import { BaseProps } from "@/types/ui-props";

// UI Modal Components
export function Modal({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "max-w-sm w-full p-5 pt-7.5 relative flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040] animate-zoom-in",
        className
      )}
    >
      {children}
    </div>
  );
}
export function ModalContent({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full text-center flex flex-col items-center justify-center gap-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function ModalTitle({
  children,
  className,
  ...props
}: BaseProps<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={mergeClassNames(
        "text-lg font-medium text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </h3>
  );
}
export function ModalDescription({
  children,
  className,
  ...props
}: BaseProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={mergeClassNames(
        "text-sm text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </p>
  );
}
export function ModalActions({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
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
}: LinkProps) {
  return (
    <Link
      {...props}
      className={mergeClassNames(
        "w-full h-10 flex items-center justify-center cursor-pointer bg-[var(--theme-primary)] rounded-xl hover:bg-[var(--theme-secondary)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
export function ModalProceedAction({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={mergeClassNames(
        "w-full h-10 flex items-center justify-center cursor-pointer bg-red-500 rounded-xl hover:bg-red-400",
        className
      )}
    >
      {children}
    </button>
  );
}
