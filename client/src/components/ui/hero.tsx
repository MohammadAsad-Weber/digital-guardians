import { mergeClassNames } from "@/libs";
import type { BaseProps } from "@/types/ui-props";

// UI Hero Components
export function Hero({
  children,
  className,
  ...props
}: BaseProps<HTMLElement>) {
  return (
    <section
      {...props}
      className={mergeClassNames(
        "w-full py-12 px-5 flex flex-col items-center justify-center gap-10 bg-[#807DDA26]",
        className
      )}
    >
      {children}
    </section>
  );
}
export function HeroContent({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "text-center flex flex-col items-center justify-center gap-2.5",
        className
      )}
    >
      {children}
    </div>
  );
}
export function HeroTitle({
  children,
  className,
  ...props
}: BaseProps<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={mergeClassNames(
        "text-3xl font-extrabold sm:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
export function HeroDescription({
  children,
  className,
  ...props
}: BaseProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={mergeClassNames(
        "tracking-widest text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </p>
  );
}
