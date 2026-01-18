import type React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <section
      className={cn("w-full px-4 py-9 lg:px-0 lg:py-25", className)}
    >
      {children}
    </section>
  );
};
