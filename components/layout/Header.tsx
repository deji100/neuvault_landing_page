"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SimpleLink from "@/components/ui/links/SimpleLink";
import { GiHamburgerMenu } from "react-icons/gi";
import CTAButton from "@/components/ui/buttons/CTAButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background border-border">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-4 md:py-8">
        <Link
          href="https://flowbite.com/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Image
            src="/favicon-96x96.png"
            width={32}
            height={32}
            alt="EvoCloud Logo"
          />
          <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-foreground">
            EvoCloud
          </span>
        </Link>
        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
          <CTAButton>Request A Demo</CTAButton>
          <button
            onClick={handleToggle}
            className="inline-flex items-center w-10 h-10 justify-center text-sm text-foreground rounded-lg md:hidden hover:bg-muted focus:outline-none focus:ring-2 focus:ring-muted"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col w-full items-stretch gap-y-2 font-medium p-4 md:p-0 mt-4 border rounded-lg bg-muted border-border md:space-x-8 rtl:space-x-reverse md:w-auto md:flex-row md:items-start md:mt-0 md:border-0 md:bg-background">
            <SimpleLink href="/" showDropdown>Solutions</SimpleLink>
            <SimpleLink href="/" showDropdown>Resources</SimpleLink>
            <SimpleLink href="/" showDropdown>Comparisons</SimpleLink>
            <SimpleLink href="/">Pricing</SimpleLink>
            <SimpleLink href="/">Support</SimpleLink>
            <SimpleLink href="/">Community</SimpleLink>
            <SimpleLink href="/">Developer</SimpleLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
