import { Smartphone } from "lucide-react";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa";

type PlatformIconLink = {
  label: string;
  href?: string;
};

const platformIcons = [
  {
    label: "iPhone",
    icon: Smartphone,
    colorClassName: "text-blue-500",
  },
  {
    label: "Android",
    icon: FaAndroid,
    colorClassName: "text-emerald-400",
  },
  {
    label: "Windows",
    icon: FaWindows,
    colorClassName: "text-sky-400",
  },
  {
    label: "macOS",
    icon: FaApple,
    colorClassName: "text-slate-900",
  },
];

type PlatformIconRowProps = {
  links?: PlatformIconLink[];
  className?: string;
  iconClassName?: string;
  iconTone?: "inherit" | "brand";
};

export default function PlatformIconRow({
  links = [],
  className = "",
  iconClassName = "",
  iconTone = "inherit",
}: PlatformIconRowProps) {
  const linkMap = new Map(links.map((link) => [link.label, link.href]));

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Available platforms"
    >
      {platformIcons.map(({ label, icon: Icon, colorClassName }) => {
        const href = linkMap.get(label);
        const toneClassName = iconTone === "brand" ? colorClassName : "";
        const content = (
          <>
            <Icon
              aria-hidden="true"
              className={`h-5 w-5 ${toneClassName} ${iconClassName}`}
            />
            <span className="sr-only">{label}</span>
          </>
        );

        if (href) {
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/15 bg-white/90 text-current shadow-sm transition hover:-translate-y-0.5 hover:border-current/30 hover:bg-white"
            >
              {content}
            </a>
          );
        }

        return (
          <span
            key={label}
            aria-label={label}
            title={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/15 bg-white/90 text-current shadow-sm"
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}
