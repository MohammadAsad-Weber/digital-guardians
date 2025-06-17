import cn from "@/utilities/classname";
import { GeneralProps } from "@/components/ui/types";

// Components
export function Hero({ children, className }: GeneralProps) {
  return (
    <section
      className={cn(
        "w-full py-12 px-5 flex flex-col items-center justify-center gap-10 bg-[#807DDA26]",
        className
      )}
    >
      {children}
    </section>
  );
}
export function HeroContent({ children, className }: GeneralProps) {
  return (
    <div
      className={cn(
        "text-center flex flex-col items-center justify-center gap-2.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function HeroTitle({ children, className }: GeneralProps) {
  return (
    <h1 className={cn("text-3xl font-extrabold sm:text-4xl", className)}>
      {children}
    </h1>
  );
}
export function HeroDescription({ children, className }: GeneralProps) {
  return (
    <p
      className={cn("tracking-widest text-[var(--text-secondary)]", className)}
    >
      {children}
    </p>
  );
}
