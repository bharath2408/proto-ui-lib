"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ChevronDown,
  ChevronRight,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import React, { useState } from "react";

type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: SidebarItem[];
};

const sidebarVariants = cva(
  "h-screen p-4 flex flex-col space-y-4 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-white",
        compact: "text-gray-300 text-sm",
        modern: "text-gray-100 shadow-lg border-r border-gray-700",
        transparent: "bg-opacity-40 backdrop-blur-lg text-gray-100 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type SidebarProps = {
  items: SidebarItem[];
  className?: string;
  variant?: VariantProps<typeof sidebarVariants>["variant"];
  buttonClassName?: string;
  footer?: React.ReactNode;
  expand?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  className = "bg-gray-700",
  variant = "default",
  buttonClassName = "hover:bg-gray-800",
  footer,
  expand = false,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.has(id)
        ? new Set([...prev].filter((item) => item !== id))
        : new Set([...prev, id])
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        sidebarVariants({ variant }),
        className,
        isCollapsed ? "w-24" : "w-64",
        "relative"
      )}
    >
      {/* Collapse Toggle Button */}
      {expand && (
        <button
          onClick={toggleCollapse}
          className={cn(
            "absolute -right-4 top-3 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          )}
        >
          {isCollapsed ? (
            <PanelLeft className="w-6 h-6" />
          ) : (
            <PanelLeftClose className="w-6 h-6" />
          )}
        </button>
      )}
      {/* Sidebar Items */}
      <div className="flex-1">
        {items.map((item) => (
          <div key={item.id}>
            <button
              className={cn(
                "flex items-center justify-between w-full px-2 py-3 rounded",
                buttonClassName,
                isCollapsed && "p-5 justify-center rounded-full"
              )}
              onClick={() => item.children && toggleItem(item.id)}
            >
              <span className="flex items-center space-x-2">
                {item.icon && <span>{item.icon}</span>}
                {!isCollapsed && <span>{item.label}</span>}
              </span>
              {!isCollapsed && item.children && (
                <span>
                  {expandedItems.has(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              )}
            </button>
            {!isCollapsed && item.children && expandedItems.has(item.id) && (
              <div className={cn("ml-6 mt-2 space-y-2")}>
                {item.children.map((child) => (
                  <a
                    key={child.id}
                    href={child.href}
                    className={cn(
                      "block px-4 py-2 hover:bg-gray-700 rounded",
                      buttonClassName
                    )}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Footer Section */}
      {footer && (
        <div className={cn("mt-4", isCollapsed && "hidden")}>{footer}</div>
      )}
    </aside>
  );
};

export default Sidebar;
