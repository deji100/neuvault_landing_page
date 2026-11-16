"use client";

import { useStoreUrl } from "@/components/specific/home/useStoreUrl";

/** Sends the visitor to their own store; on other platforms, to the home page's download section. */
export default function DownloadLink({ className, children, location = "comparison", workflowId }: { className?: string; children: React.ReactNode; location?: string; workflowId?: string }) {
  const storeUrl = useStoreUrl();
  const external = storeUrl.startsWith("http");
  const href = external ? storeUrl : `/${storeUrl}`;

  return (
    <a className={className} href={href} data-download-location={location} data-workflow-id={workflowId} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}
