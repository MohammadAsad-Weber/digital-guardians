import { useState } from "react";
import { Link } from "react-router";
import { mergeClassNames } from "@/libs";

// React-icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";

// Type Definitions
import type { BaseProps, SubmitButtonProps } from "@/types/ui-props";

// Extended Type Definitions
interface FormProps extends BaseProps<HTMLFormElement> {
  backTo?: string;
}
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.JSX.Element;
}

// UI Auth Form Components
export function Form({
  children,
  className,
  backTo = "/",
  ...props
}: FormProps) {
  return (
    <form
      {...props}
      className={mergeClassNames(
        "max-w-md w-full p-5 pt-7.5 relative flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_20px_#0000004D] animate-slide-in",
        className
      )}
    >
      <Link
        to={backTo}
        className="absolute top-3.5 right-3.5 text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]"
      >
        <IoClose size="1.5rem" />
      </Link>
      {children}
    </form>
  );
}
export function FormHeader({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "text-center flex flex-col items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
export function FormTitle({
  children,
  className,
  ...props
}: BaseProps<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={mergeClassNames("text-2xl font-semibold", className)}
    >
      {children}
    </h3>
  );
}
export function FormDescription({
  children,
  className,
  ...props
}: BaseProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={mergeClassNames(
        "text-sm text-[var(--text-tertiary)]",
        className
      )}
    >
      {children}
    </p>
  );
}
export function FormBody({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full flex flex-col items-center justify-center gap-5",
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
      className={mergeClassNames("w-full flex flex-col gap-2.5", className)}
    >
      {children}
    </div>
  );
}
export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={mergeClassNames("w-fit font-medium", className)}
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
export function Input({
  icon,
  value,
  className,
  type = "text",
  ...props
}: InputProps) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="w-full px-5 flex items-center justify-start gap-3.5 bg-[var(--bg-primary)] rounded-full">
      {icon}
      <input
        {...props}
        type={type === "password" ? (visibility ? "text" : "password") : type}
        className={mergeClassNames("w-full py-3.5 outline-none", className)}
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
          "ml-1.5 text-xs text-red-500 font-medium flex items-center justify-start gap-1.5",
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
