/** Fixed public event fields; forwarding to GA is separately gated by consent. */
import type { WorkflowStage } from "./workflows";
import { getWorkflow } from "./workflows";

export type DownloadPlatform = "ios" | "android" | "macos" | "windows";
export type MarketingEvent =
  | { event: "workflow_selected"; workflow_id: string; surface: "home" | "use_case" }
  | { event: "workflow_step_viewed"; workflow_id: string; step: WorkflowStage; step_number: number; surface: "home" | "use_case" }
  | { event: "workflow_visible" | "workflow_completed"; workflow_id: string; surface: "home" | "use_case" }
  | { event: "download_clicked" | "platform_selected"; workflow_id?: string; platform: DownloadPlatform; location: string };

let selectedWorkflow: string | undefined;

export function setMarketingWorkflow(id: string) {
  if (getWorkflow(id)) selectedWorkflow = id;
}

export function emitMarketingEvent(event: MarketingEvent) {
  if (typeof window === "undefined") return;
  // The GA adapter drops events until consent is granted; there is no replay queue.
  window.dispatchEvent(new CustomEvent<MarketingEvent>("neuvault:marketing", { detail: Object.freeze({ ...event }) }));
}

export function recordDownload(platform: DownloadPlatform, location: string, explicitPlatform: boolean) {
  if (explicitPlatform) emitMarketingEvent({ event: "platform_selected", ...(selectedWorkflow ? { workflow_id: selectedWorkflow } : {}), platform, location });
  emitMarketingEvent({ event: "download_clicked", ...(selectedWorkflow ? { workflow_id: selectedWorkflow } : {}), platform, location });
}
