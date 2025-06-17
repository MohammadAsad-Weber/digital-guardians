import { useState } from "react";
import { Link } from "react-router";
import cn from "@/utilities/classname";
import { IoClose } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// Types
import type {
  GeneralProps,
  FormProps,
  LabelProps,
  InputProps,
  SubmitButtonProps,
} from "@/components/ui/types";

// Components
export function Form({ children, className, back = "/", ...props }: FormProps) {
  return (
    <form
      className={cn(
        "max-w-md w-full p-5 pt-7.5 relative flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_20px_#0000004D] animate-slide-in",
        className
      )}
      {...props}
    >
      <Link
        to={back}
        className="absolute top-3.5 right-3.5 text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
      >
        <IoClose size="1.5rem" />
      </Link>
      {children}
    </form>
  );
}
export function FormHeader({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "text-center flex flex-col items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
export function FormTitle({ children, className }: GeneralProps) {
  return (
    <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>
  );
}
export function FormDescription({ children, className }: GeneralProps) {
  return (
    <p className={cn("text-sm text-[var(--text-tertiary)]", className)}>
      {children}
    </p>
  );
}
export function FormBody({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function InputContainer({ children, className }: GeneralProps) {
  return (
    <div className={cn("w-full flex flex-col gap-2.5", className)}>
      {children}
    </div>
  );
}
export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label className={cn("w-fit font-medium", className)} {...props}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
export function Input({
  icon,
  className,
  type = "text",
  ...props
}: InputProps) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="w-full px-5 flex items-center justify-start gap-3.5 bg-[var(--bg-primary)] rounded-full">
      {icon}
      <input
        type={type === "password" ? (visibility ? "text" : "password") : type}
        className={cn("w-full py-3.5 outline-none", className)}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setVisibility((val) => !val)}
          style={
            typeof props.value === "string" && props.value
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          className="text-2xl text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--text-primary)]"
        >
          {visibility ? <VscEyeClosed /> : <VscEye />}
        </button>
      )}
    </div>
  );
}
export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "w-full h-12 text-center text-white bg-[var(--theme-primary)] rounded-xl cursor-pointer hover:bg-[var(--theme-secondary)] disabled:bg-[var(--bg-disabled)] disabled:cursor-no-drop",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
