import type { TypographyProps } from "@/types";

const styles: Record<TypographyProps["variant"], string> = {
  script: "font-script text-[48px] leading-tight",
  subtitle: "font-subtitle text-[24px] leading-tight",
  ampersand: "font-ampersand text-[36px] leading-tight",
  body: "font-body text-base leading-relaxed",
  "body-bold": "font-body text-base font-bold leading-relaxed",
  accent: "font-body text-[32px] font-bold leading-tight",
};

export default function Typography({
  children,
  variant,
  className = "",
  as: Tag = "p",
}: TypographyProps) {
  return (
    <Tag className={`${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
