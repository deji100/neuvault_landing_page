// Copied from the desktop animation clock; paused demo animations stay paused.
/**
 * Keeps the app's looping icon animations in step. Each CSS animation
 * normally runs from the moment its element gets the style, so a bell that
 * starts ringing later (a count arriving, a page opening) ran out of phase
 * with the rest and the motion read as noise. Pinning every one of these
 * animations to the document timeline's zero gives them one shared clock:
 * equal (or dividing) durations then move together no matter when they start.
 */
const SYNCED_ANIMATIONS = new Set([
  // Home header bell and sidebar attention rows.
  "nv-bell-ring",
  "nv-bell-clapper",
  "nv-sidebar-ring",
  // Note & Voice header buttons.
  "nv-header-icon-pop",
  "nv-files-front",
  "nv-files-back",
  "nv-sparkle-star",
  "nv-sparkle-blink",
  "nv-mic-level",
  "nv-mic-wave",
  // Reminders "Add to calendar".
  "nv-calendar-pop",
  "nv-calendar-rings",
  "nv-calendar-plus",
  "nv-calendar-breathe",
]);

function pinToSharedClock(event: AnimationEvent) {
  if (!SYNCED_ANIMATIONS.has(event.animationName)) return;
  if (event.target instanceof Element && getComputedStyle(event.target).animationPlayState === "paused") return;
  const target = event.target;
  if (!(target instanceof Element) || typeof target.getAnimations !== "function") return;
  for (const animation of target.getAnimations()) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === event.animationName &&
      animation.startTime !== 0
    ) {
      animation.startTime = 0;
    }
  }
}

let installed = false;

export function installIconAnimationSync() {
  if (installed || typeof document === "undefined") return;
  installed = true;
  // animationstart bubbles from every element (SVG parts included), so one
  // listener covers icons mounted at any time.
  document.addEventListener("animationstart", pinToSharedClock, true);
}
