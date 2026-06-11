"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Apple, Clock, Download, MonitorDown, Smartphone } from "lucide-react";

const ANDROID_URL =
  process.env.NEXT_PUBLIC_ANDROID_URL?.trim() ||
  "https://play.google.com/store/apps/details?id=app.neuvault";
const IOS_URL =
  process.env.NEXT_PUBLIC_IOS_URL?.trim() ||
  "https://apps.apple.com/ng/app/neuvault/id6759370392";
const WINDOWS_URL =
  process.env.NEXT_PUBLIC_WINDOWS_URL?.trim() ||
  "https://apps.microsoft.com/detail/9PNM0GXZPT8T?hl=en-us&gl=US&ocid=pdpshare";
const DESKTOP_TRIGGER_OFFSET = 140;
const MOBILE_TRIGGER_OFFSET = 120;

function DownloadCard({
  platform,
  icon,
  url,
}: {
  platform: string;
  icon: ReactNode;
  url?: string;
}) {
  const isAvailable = typeof url === "string" && url.length > 0;

  if (!isAvailable) {
    return (
      <div className="flex min-h-[92px] w-full cursor-not-allowed flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-500">
        <span className="inline-flex items-center gap-2">
          {icon}
          <span>{platform}</span>
        </span>
        <span className="inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[11px]">
          <Clock size={12} /> Soon
        </span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[92px] w-full flex-col justify-between rounded-2xl bg-blue-600 p-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {platform}
      </span>
      <span className="text-xs font-medium text-white/75">Download</span>
    </a>
  );
}

export default function FloatingDownloadButtons() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const openDownloads = () => {
      setForceVisible(true);
      setIsVisible(true);
      setOpen(true);
    };

    window.addEventListener("neuvault:open-downloads", openDownloads);

    return () => {
      window.removeEventListener("neuvault:open-downloads", openDownloads);
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const desktopTrigger = document.getElementById("features");
      const mobileTrigger = document.getElementById("screenshots");
      const footer = document.getElementById("site-footer");
      const triggerSection = window.innerWidth >= 700 ? desktopTrigger : mobileTrigger;

      if (!triggerSection || !footer) {
        if (!forceVisible) {
          setIsVisible(false);
          setOpen(false);
        }
        return;
      }

      const triggerOffset = window.innerWidth >= 700
        ? DESKTOP_TRIGGER_OFFSET
        : MOBILE_TRIGGER_OFFSET;
      const isPastTriggerSection =
        triggerSection.getBoundingClientRect().top <= triggerOffset;
      const isFooterVisible = footer.getBoundingClientRect().top <= window.innerHeight;
      const shouldShow = isPastTriggerSection && !isFooterVisible;

      setIsVisible(shouldShow);

      if (isFooterVisible) {
        setForceVisible(false);
        setOpen(false);
        return;
      }

      if (!shouldShow && !forceVisible) {
        setOpen(false);
      }
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [forceVisible]);

  if (!isVisible && !forceVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[5000]">
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {open ? (
            <motion.div
              className="glass-panel w-[min(calc(100vw-2.5rem),340px)] rounded-[1.4rem] p-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <p className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                Enjoy 500 free one-time Credit
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <DownloadCard platform="iOS" icon={<Apple size={16} />} url={IOS_URL} />
                <DownloadCard platform="Android" icon={<Smartphone size={16} />} url={ANDROID_URL} />
                <DownloadCard platform="Windows" icon={<MonitorDown size={16} />} url={WINDOWS_URL} />
                <DownloadCard platform="macOS" icon={<Apple size={16} />} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_22px_50px_-20px_rgba(37,99,235,0.85)] hover:bg-blue-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Collapse NeuVault downloads" : "Expand NeuVault downloads"}
          aria-expanded={open}
        >
          <Download size={18} />
          Download
        </motion.button>
      </div>
    </div>
  );
}
