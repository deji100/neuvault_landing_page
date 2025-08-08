import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FaChevronDown } from "react-icons/fa";

interface SimpleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  showDropdown?: boolean;
}

export default function SimpleLink({
  href,
  children,
  className,
  showDropdown = false,
  ...props
}: SimpleLinkProps) {
  return (
    <Link
      href={href!}
      {...props}
      className={twMerge(
        "inline-flex items-center gap-2 justify-between py-2 px-3 md:p-0 text-foreground bg-primary rounded-sm md:bg-transparent",
        className
      )}
    >
      <span>{children}</span>
      {showDropdown && <FaChevronDown />}
    </Link>
  );
}
