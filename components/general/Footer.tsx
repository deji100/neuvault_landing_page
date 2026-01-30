"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0F19] text-gray-400 border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo2.png"
                alt="NeuVault logo"
                width={60}
                height={60}
                className="rounded w-10"
              />
              <span className="text-xl font-semibold text-white">
                NeuVault
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              A private, local-first AI vault for your most important documents.
              Your data stays yours — always.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="hover:text-white transition"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("how-it-works")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="hover:text-white transition"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("see-it-in-action")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-white transition"
                >
                  Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("testimonials")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-white transition"
                >
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#waitlist" className="hover:text-white transition">
                  Join Beta
                </Link>
              </li>
              {/* <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li> */}
              {/* <li>
                <Link href="/docs" className="hover:text-white transition">
                  Documentation
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500">
                  No documents are stored on our servers.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="text-white hover:underline">
              NeuVault
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-4 bg-white border-none">
            {/* Social placeholders */}
            {/* <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              Twitter
            </a> */}
            {/* <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white transition"
            >
              GitHub
            </a> */}
            {/* <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              LinkedIn
            </a> */}
            <a
              href="https://saasbrowser.com/en/saas/1019052/neuvault"
              target="_blank"
              rel="noopener"
            >
              <img
                src="https://static-files.saasbrowser.com/saas-browser-badge-13.svg"
                alt="Proud to be listed on SaaS Browser"
                width="200"
                loading="lazy"
                fetchPriority="low"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
