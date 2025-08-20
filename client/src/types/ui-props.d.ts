// Custom HTML button type without the "type" property
type HTMLSubmitButtonElement = Omit<HTMLButtonElement, "type">;

// Base props for components, defaulting to a div element
export type BaseProps<T extends HTMLElement = HTMLDivElement> =
  React.HTMLAttributes<T>;

// Props for a submit button using the custom HTMLSubmitButtonElement type
export type SubmitButtonProps =
  React.ButtonHTMLAttributes<HTMLSubmitButtonElement>;
