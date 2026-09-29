"use client";

import { useEffect, useState } from "react";

import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";

/** Send each visitor to their own store; everyone else gets the platform list. */
export function useStoreUrl() {
  const [url, setUrl] = useState("#download");

  useEffect(() => {
    const ua = navigator.userAgent;
    const touchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/.test(ua) || touchMac) setUrl(IOS_APP_STORE_URL);
    else if (/Android/.test(ua)) setUrl(ANDROID_PLAY_STORE_URL);
    else if (/Macintosh|Mac OS X/.test(ua)) setUrl(MACOS_APP_STORE_URL);
    else if (/Windows/.test(ua)) setUrl(WINDOWS_MICROSOFT_STORE_URL);
  }, []);

  return url;
}
