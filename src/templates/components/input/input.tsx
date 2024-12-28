import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

interface IconElement extends React.ReactElement<any, LucideIcon> {}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconSize = "md",
      iconPosition = "start",
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {icon && iconPosition === "start" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IconWrapper
              icon={icon}
              size={iconSize}
              className="text-muted-foreground"
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "start" && "pl-10",
            icon && iconPosition === "end" && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "end" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IconWrapper
              icon={icon}
              size={iconSize}
              className="text-muted-foreground"
            />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
