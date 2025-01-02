"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

// Base BentoGrid component
const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1 gap-4",
      "auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[250px]",
      "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      "p-4 sm:p-6 md:p-8",
      className
    )}
    {...props}
  />
));
BentoGrid.displayName = "BentoGrid";

// Base BentoItem component
const BentoItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "md" | "lg" | "xl";
    accentColor?: string;
    backgroundImage?: string;
  }
>(({ className, size = "sm", accentColor, backgroundImage, ...props }, ref) => {
  const sizeClasses = {
    sm: "col-span-1",
    md: "col-span-1 sm:col-span-2",
    lg: "col-span-1 sm:col-span-2 xl:col-span-3",
    xl: "col-span-1 sm:col-span-2 xl:col-span-4",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4",
        "hover:shadow-xl hover:scale-[1.02] transition-all duration-300",
        "dark:bg-gray-800/50 dark:border-gray-700",
        "group/bento relative overflow-hidden h-full",
        "backdrop-blur-sm backdrop-filter",
        sizeClasses[size],
        className
      )}
      style={{
        background: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 dark:to-black/20 pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-grid-white/10 pointer-events-none" />
      <div className="relative z-10 h-full">{props.children}</div>
    </div>
  );
});
BentoItem.displayName = "BentoItem";

// BentoHeader component
const BentoHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 group-hover/bento:translate-x-1 transition-transform duration-300",
      className
    )}
    {...props}
  />
));
BentoHeader.displayName = "BentoHeader";

// BentoIcon component
const BentoIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    accentColor?: string;
  }
>(({ className, accentColor, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
      "bg-gradient-to-br shadow-inner",
      "group-hover/bento:shadow-lg transition-all duration-300",
      accentColor || "from-blue-500 to-blue-600",
      className
    )}
    {...props}
  />
));
BentoIcon.displayName = "BentoIcon";

// BentoTitle component
const BentoTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100",
      className
    )}
    {...props}
  />
));
BentoTitle.displayName = "BentoTitle";

// BentoDescription component
const BentoDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed",
      className
    )}
    {...props}
  />
));
BentoDescription.displayName = "BentoDescription";

// BentoContent component
const BentoContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 group-hover/bento:translate-y-[-2px] transition-transform duration-300",
      className
    )}
    {...props}
  />
));
BentoContent.displayName = "BentoContent";

export {
  BentoContent,
  BentoDescription,
  BentoGrid,
  BentoHeader,
  BentoIcon,
  BentoItem,
  BentoTitle,
};
