import * as React from "react";
import { cn } from "@/core/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "hover:bg-accent/10 text-foreground",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
