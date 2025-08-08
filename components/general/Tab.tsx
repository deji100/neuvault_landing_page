import React from "react";
import { twMerge } from "tailwind-merge";

interface TabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
}

export default function Tab({
  children,
  active = false,
  className,
  ...props
}: TabProps) {
  return (
    <li className="me-2">
      <a
        className={twMerge(
          "inline-block p-4 border-b-2 rounded-t-lg transition-colors",
          active
            ? "text-primary border-primary"
            : "text-muted-foreground border-transparent hover:text-foreground hover:border-border",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}
