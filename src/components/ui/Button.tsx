import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants = {
  primary: "bg-gold-500 text-black hover:bg-gold-400 hover:shadow-[0_0_15px_rgba(201,162,39,0.4)]",
  secondary: "bg-zinc-800 text-white hover:bg-zinc-700 hover:text-gold-400 border border-transparent",
  outline: "border border-gold-500/50 text-gold-500 hover:bg-gold-500/10 hover:border-gold-500",
  ghost: "hover:bg-zinc-800 hover:text-gold-400 text-zinc-300",
};

const sizes = {
  sm: "min-h-[44px] px-4 text-sm",
  md: "min-h-[44px] px-6 text-base",
  lg: "min-h-[56px] px-8 text-lg",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} = {}) {
  return cn(baseStyles, variants[variant], sizes[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
