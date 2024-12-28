"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridItemProps {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4",
        "hover:shadow-lg transition duration-200",
        "dark:bg-gray-800 dark:border-gray-700",
        "group/bento relative overflow-hidden h-full",
        className
      )}
    >
      {header}
      <div className="flex flex-col h-full justify-between">
        {(title || icon) && (
          <div className="flex items-center gap-3">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            {title && (
              <h3 className="font-semibold text-lg tracking-tight text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}
          </div>
        )}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 auto-rows-[200px] gap-4 md:auto-rows-[220px]",
        "md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoGridDemo = () => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <BentoGrid className="max-w-7xl mx-auto">
        {/* Featured Item */}
        <BentoGridItem
          className="md:col-span-2"
          title="Featured Content"
          description="This is a featured item that spans two columns on larger screens."
          icon={
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              F
            </div>
          }
        />

        {/* Analytics */}
        <BentoGridItem
          title="Analytics"
          description="Track your performance metrics"
          icon={
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              A
            </div>
          }
        />

        {/* Reports */}
        <BentoGridItem
          title="Reports"
          description="Generate detailed insights"
          icon={
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              R
            </div>
          }
        />

        {/* Dashboard Overview */}
        <BentoGridItem
          className="md:col-span-2 lg:col-span-2"
          title="Dashboard Overview"
          description="Get a birds-eye view of your entire system"
          icon={
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
              D
            </div>
          }
        />

        {/* Settings */}
        <BentoGridItem
          title="Settings"
          description="Configure your preferences"
          icon={
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
              S
            </div>
          }
        />

        {/* Notifications */}
        <BentoGridItem
          title="Notifications"
          description="Stay updated with alerts"
          icon={
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
              N
            </div>
          }
        />

        {/* Support */}
        <BentoGridItem
          title="Support"
          description="Get help when you need it"
          icon={
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
              S
            </div>
          }
        />
      </BentoGrid>
    </div>
  );
};

export { BentoGrid, BentoGridDemo, BentoGridItem };
