import { useState } from "react";
import { Link } from "react-router";
import { mergeClassNames } from "@/libs";

// React-icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";

// Type Definitions
import type { BaseProps, SubmitButtonProps } from "@/types/ui-props";

// Extended Type Definitions
interface FormHeaderProps extends BaseProps {
  backTo: string;
}

// UI Form Components
export function Form({
  children,
  className,
  ...props
}: BaseProps<HTMLFormElement>) {
  return (
    <form
      {...props}
      className={mergeClassNames(
        "max-w-md w-full p-5 pt-7.5 flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040] animate-slide-in",
        className
      )}
    >
      {children}
    </form>
  );
}
export function FormHeader({
  children,
  className,
  backTo,
  ...props
}: FormHeaderProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full flex items-center justify-between",
        className
      )}
    >
      {children}
      <Link
        to={backTo}
        className="text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
      >
        <IoClose size="1.5rem" />
      </Link>
    </div>
  );
}
export function FormTitle({
  children,
  className,
  ...props
}: BaseProps<HTMLHeadElement>) {
  return (
    <h3
      {...props}
      className={mergeClassNames("text-xl font-medium", className)}
    >
      {children}
    </h3>
  );
}
export function FormBody({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full flex flex-col items-center justify-center gap-3.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function InputContainer({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full py-2.5 px-3.5 flex flex-col gap-0.5 border border-gray-500 rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
export function Label({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={mergeClassNames(
        "text-sm text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </label>
  );
}
export function Input({
  value,
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="w-full flex items-center justify-between gap-3.5">
      <input
        {...props}
        type={type === "password" ? (visibility ? "text" : "password") : type}
        className={mergeClassNames("w-full outline-none", className)}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setVisibility((val) => !val)}
          style={value ? { visibility: "visible" } : { visibility: "hidden" }}
          className="text-2xl text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--text-primary)]"
        >
          {visibility ? <VscEyeClosed /> : <VscEye />}
        </button>
      )}
    </div>
  );
}
export function ErrorMessage({
  children,
  className,
  ...props
}: BaseProps<HTMLParagraphElement>) {
  return (
    children && (
      <p
        {...props}
        className={mergeClassNames(
          "-my-1 ml-0.5 text-xs text-red-500 font-medium flex items-center justify-start self-start gap-1.5",
          className
        )}
      >
        <IoCloseCircleOutline size="1rem" />
        {children}
      </p>
    )
  );
}
export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={mergeClassNames(
        "w-full h-12 text-center text-white bg-[var(--theme-primary)] rounded-xl cursor-pointer hover:bg-[var(--theme-secondary)] disabled:bg-[var(--bg-disabled)] disabled:cursor-no-drop",
        className
      )}
    >
      {children}
    </button>
  );
}
