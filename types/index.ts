export interface TypographyProps {
  children: React.ReactNode;
  variant: "script" | "subtitle" | "ampersand" | "body" | "body-bold" | "accent";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export interface DecorationProps {
  variant: "top-left" | "bottom-right" | "flower";
  className?: string;
}

export interface CoupleProfileProps {
  image: string;
  name: React.ReactNode;
  parents: string;
  align: "start" | "end";
  className?: string;
}
