import { useState } from "react";
import { Link } from "react-router";
import cn from "@/utilities/classname";
import { IoClose } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// Types
import type {
  GeneralProps,
  FormProps,
  FormHeaderProps,
  LabelProps,
  SubmitButtonProps,
} from "@/components/ui/types";

// Components
export function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={cn(
        "max-w-md w-full p-5 pt-7.5 flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040] animate-slide-in",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}
export function FormHeader({ children, back, className }: FormHeaderProps) {
  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      {children}
      <Link
        to={back}
        className="text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
      >
        <IoClose size="1.5rem" />
      </Link>
    </div>
  );
}
export function FormTitle({ children, className }: GeneralProps) {
  return <h3 className={cn("text-xl font-medium", className)}>{children}</h3>;
}
export function FormBody({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-3.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function InputContainer({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full py-2.5 px-3.5 flex flex-col gap-0.5 border border-gray-500 rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm text-[var(--text-secondary)]", className)}
      {...props}
    >
      {children}
    </label>
  );
}
export function Input({
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="w-full flex items-center justify-between gap-3.5">
      <input
        type={type === "password" ? (visibility ? "text" : "password") : type}
        className={cn("w-full outline-none", className)}
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
