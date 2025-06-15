import { LinkProps } from "react-router";

export interface GeneralProps {
  children?: React.ReactNode;
  className?: string;
}
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  back?: string;
  children?: React.ReactNode;
}
export interface FormHeaderProps extends GeneralProps {
  back: string;
}
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  required?: boolean;
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.JSX.Element;
}
export interface SubmitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode;
}
export interface CustomLinkProps extends LinkProps {
  children?: React.ReactNode;
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
