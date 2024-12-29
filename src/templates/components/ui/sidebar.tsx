"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  PanelLeft,
  PanelLeftClose,
  X,
} from "lucide-react";
import * as React from "react";

// Context
interface SidebarContextValue {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobileMenu: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a Sidebar");
  }
  return context;
}

// Sidebar variants
const sidebarVariants = cva(
  "relative flex flex-col space-y-4 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-slate-700 text-white",
        modern: "text-gray-100 shadow-lg border-r border-gray-700",
        transparent: "bg-white/30 backdrop-blur-sm text-gray-100 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// MobileToggle component
const MobileToggle = () => {
  const { toggleMobileMenu, isMobileOpen } = useSidebarContext();

  return (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-lg"
      aria-label={isMobileOpen ? "Close menu" : "Open menu"}
    >
      {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
};

// Sidebar component
interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  expand?: boolean;
  buttonClassName?: string;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    { className, buttonClassName, variant, children, expand = false, ...props },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const toggleCollapse = React.useCallback(() => {
      setIsCollapsed((prev) => !prev);
    }, []);

    const toggleMobileMenu = React.useCallback(() => {
      setIsMobileOpen((prev) => !prev);
    }, []);

    // Close mobile menu on wider screens
    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsMobileOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <SidebarContext.Provider
        value={{ isCollapsed, isMobileOpen, toggleCollapse, toggleMobileMenu }}
      >
        <MobileToggle />

        {/* Mobile overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        <aside
          ref={ref}
          className={cn(
            sidebarVariants({ variant, className }),
            // Desktop styles
            "h-screen p-4",
            isCollapsed
              ? "lg:w-24 translate-x-0"
              : "lg:w-64 -translate-x-full lg:translate-x-0",
            // Mobile styles
            "w-64 z-40",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
            "transition-all duration-300 ease-in-out"
          )}
          {...props}
        >
          {expand && (
            <button
              onClick={toggleCollapse}
              className={cn(
                "absolute -right-4 top-3 bg-gray-700 p-2 rounded-full hover:bg-gray-600 hidden lg:block",
                buttonClassName
              )}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeft className="w-6 h-6" />
              ) : (
                <PanelLeftClose className="w-6 h-6" />
              )}
            </button>
          )}
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isCollapsed } = useSidebarContext();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center mb-6",
        isCollapsed && window.innerWidth >= 1024 ? "justify-center" : "px-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarHeader.displayName = "SidebarHeader";

// SidebarItem component
interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  href?: string;
  label: string;
  buttonClassName?: string;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  (
    { className, icon, label, href, buttonClassName, children, ...props },
    ref
  ) => {
    const { isCollapsed, toggleMobileMenu } = useSidebarContext();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const hasChildren = React.Children.count(children) > 0;

    const handleClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      } else if (href) {
        // Close mobile menu when navigating on mobile
        if (window.innerWidth < 1024) {
          toggleMobileMenu();
        }
      }
    };

    const button = (
      <button
        className={cn(
          "flex items-center justify-between w-full rounded transition-colors duration-200 px-4 py-3",
          buttonClassName || "hover:bg-gray-800"
        )}
        onClick={handleClick}
      >
        <span className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          {(!isCollapsed || window.innerWidth < 1024) && <span>{label}</span>}
        </span>
        {(!isCollapsed || window.innerWidth < 1024) && hasChildren && (
          <span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </button>
    );

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {href && !hasChildren ? <a href={href}>{button}</a> : button}
        {(!isCollapsed || window.innerWidth < 1024) &&
          hasChildren &&
          isExpanded && (
            <div className={cn("ml-4 mt-1 space-y-1")}>{children}</div>
          )}
      </div>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

// SidebarSubItem component
interface SidebarSubItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const SidebarSubItem = React.forwardRef<HTMLAnchorElement, SidebarSubItemProps>(
  ({ className, href, label, icon, ...props }, ref) => {
    const { isCollapsed, toggleMobileMenu } = useSidebarContext();

    if (isCollapsed && window.innerWidth >= 1024) return null;

    const handleClick = () => {
      // Close mobile menu when navigating on mobile
      if (window.innerWidth < 1024) {
        toggleMobileMenu();
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "flex items-center space-x-2 text-sm text-gray-300 hover:text-white rounded-md px-3 py-2 hover:bg-gray-800/50",
          className
        )}
        {...props}
      >
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </a>
    );
  }
);
SidebarSubItem.displayName = "SidebarSubItem";

// SidebarContent component
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

// SidebarFooter component
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebarContext();

  return (
    <div
      ref={ref}
      className={cn(
        "mt-4",
        isCollapsed && window.innerWidth >= 1024 && "hidden",
        className
      )}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => {
  return (
    <hr ref={ref} className={cn("my-2 border-white", className)} {...props} />
  );
});
SidebarDivider.displayName = "SidebarDivider";

export {
  Sidebar,
  SidebarContent,
  SidebarDivider,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSubItem,
  type SidebarItemProps,
  type SidebarProps,
  type SidebarSubItemProps,
};
