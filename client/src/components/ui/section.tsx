import { mergeClassNames } from "@/libs";
import { BaseProps } from "@/types/ui-props";

// UI Section Components
export function Section({
  children,
  className,
  ...props
}: BaseProps<HTMLElement>) {
  return (
    <section
      {...props}
      className={mergeClassNames(
        "w-full py-10 px-5 text-center flex flex-col items-center justify-center gap-5 border-t-3 border-white",
        className
      )}
    >
      {children}
    </section>
  );
}
export function SectionTitle({
  children,
  className,
  ...props
}: BaseProps<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={mergeClassNames(
        "text-center text-2xl font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
}
export function SectionDescription({
  children,
  className,
  ...props
}: BaseProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={mergeClassNames(
        "max-w-screen-md w-full text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </p>
  );
}
export function CardContainer({ children, className, ...props }: BaseProps) {
  return (
    <div
      {...props}
      className={mergeClassNames(
        "w-full flex flex-wrap items-center justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
