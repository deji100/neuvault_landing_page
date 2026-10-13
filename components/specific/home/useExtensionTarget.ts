"use client";

import { useEffect, useState } from "react";

import { detectBrowser, extensionTargetFor, type ExtensionTarget } from "@/lib/browserExtension";

/** The visitor's own extension link; Chrome until the browser is known (server render). */
export function useExtensionTarget(): ExtensionTarget {
  const [target, setTarget] = useState<ExtensionTarget>(() => extensionTargetFor("chrome"));
  useEffect(() => {
    setTarget(extensionTargetFor(detectBrowser()));
  }, []);
  return target;
}
