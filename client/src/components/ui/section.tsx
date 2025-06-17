import cn from "@/utilities/classname";
import { GeneralProps } from "@/components/ui/types";

// Components
export function Section({ children, className }: GeneralProps) {
  return (
    <section
      className={cn(
        "w-full py-10 px-5 text-center flex flex-col items-center justify-center gap-5 border-t-3 border-white",
        className
      )}
    >
      {children}
    </section>
  );
}
export function SectionTitle({ children, className }: GeneralProps) {
  return (
    <h2 className={cn("text-center text-2xl font-semibold", className)}>
      {children}
    </h2>
  );
}
export function SectionDescription({ children, className }: GeneralProps) {
  return (
    <p
      className={cn(
        "max-w-screen-md w-full text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </p>
  );
}
export function CardContainer({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-wrap items-center justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
