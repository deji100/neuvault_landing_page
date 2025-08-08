import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="p-6 sm:p-10 bg-background text-muted-foreground border-t border-border">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">
                Resources
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">
                Follow Us
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">
                Legal
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-border" />

        <div className="sm:flex sm:items-center sm:justify-between text-sm">
          <span>
            &copy; 2025{" "}
            <Link href="/" className="hover:underline hover:text-foreground">
              EvoCloud™
            </Link>
            . All rights reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-5">
            <a href="#" className="hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-..." />
              </svg>
            </a>
            <a href="#" className="hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.43 0..." />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
