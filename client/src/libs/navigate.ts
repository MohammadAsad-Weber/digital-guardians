import type { NavigateFunction, To, NavigateOptions } from "react-router";

// Holds the global navigate function reference
let globalNavigate: NavigateFunction;

// Sets the global navigate function reference
export function setNavigate(navigate: NavigateFunction) {
  globalNavigate = navigate;
}
// Performs navigation using the globally stored navigate function
export function navigate(
  to: To,
  options?: NavigateOptions
): void | Promise<void> {
  if (!globalNavigate)
    throw new Error("Navigate function is not configured in the App");
  globalNavigate(to, options);
}
