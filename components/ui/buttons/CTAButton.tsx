import React from "react";
import { twMerge } from "tailwind-merge";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   label: string;
//   className?: string;
// }

export default function CTAButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "text-background bg-primary cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 sm:px-4 py-2 text-center",
        className
      )}
    >
      {children}
    </button>
  );
}
