import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader, LucideIcon } from "lucide-react";
import * as React from "react";

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        microsoft:
          "bg-[#0078D4] text-white shadow-sm hover:bg-[#106EBE] w-full",
        google:
          "bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-50 w-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface IconElement extends React.ReactElement<any, LucideIcon> {}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: IconElement | string;
  iconSize?: keyof typeof iconSizes;
  iconPosition?: "start" | "end";
}

const IconWrapper = React.memo(
  ({
    icon,
    size = "md",
    className,
  }: {
    icon: IconElement | string;
    size?: keyof typeof iconSizes;
    className?: string;
  }) => {
    if (typeof icon === "string") {
      return (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          style={{ width: iconSizes[size], height: iconSizes[size] }}
          className={className}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return React.cloneElement(icon, {
      size: iconSizes[size],
      className: cn(className, icon.props.className),
      "aria-hidden": "true",
    } as React.SVGProps<SVGSVGElement>);
  }
);
IconWrapper.displayName = "IconWrapper";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      icon,
      iconSize = "md",
      iconPosition = "start",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const hasOnlyIcon = Boolean(icon && !children);

    // Microsoft logo SVG
    const microsoftLogo = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
        <rect x="11" y="1" width="9" height="9" fill="#00A4EF" />
        <rect x="1" y="11" width="9" height="9" fill="#7FBA00" />
        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
      </svg>
    );

    // Google logo SVG
    const googleLogo = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    );

    const content = (
      <>
        {loading && (
          <Loader
            size={iconSizes[iconSize]}
            className="mr-2 animate-spin"
            aria-hidden="true"
          />
        )}
        {!loading && variant === "microsoft" && microsoftLogo}
        {!loading && variant === "google" && googleLogo}
        {!loading &&
          icon &&
          iconPosition === "start" &&
          variant !== "microsoft" &&
          variant !== "google" && (
            <IconWrapper icon={icon} size={iconSize} className="mr-2" />
          )}
        {children}
        {!loading && icon && iconPosition === "end" && (
          <IconWrapper icon={icon} size={iconSize} className="ml-2" />
        )}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        aria-label={hasOnlyIcon ? ariaLabel : undefined}
        aria-busy={loading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
