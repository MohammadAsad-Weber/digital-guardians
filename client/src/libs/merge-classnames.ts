import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Utility function to combine class names and merge Tailwind styles
const mergeClassNames = (...args: ClassValue[]) => twMerge(clsx(...args));

export default mergeClassNames;
