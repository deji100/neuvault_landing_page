import { useEffect, useRef, useState } from "react";
// Presentation copied from the desktop Planner; scoped styles are in DesktopApp.css.

export type NovaRobotMood = "idle" | "happy" | "thinking";

/**
 * Nova's planner robot. Reactive: its eyes follow the pointer, it blinks,
 * smiles on hover ("happy"), and scans while Nova works ("thinking").
 * Motion stops when the system asks for reduced motion.
 */
export default function NovaRobot({ mood = "idle", followPointer = true, size = 34 }: { mood?: NovaRobotMood; followPointer?: boolean; size?: number }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!followPointer || mood === "thinking") {
      setLook({ x: 0, y: 0 });
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Pupils travel at most 1.6 units, a little less when the pointer is close.
        const reach = Math.min(1.6, distance / 60);
        setLook({ x: (dx / distance) * reach, y: (dy / distance) * reach });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [followPointer, mood]);

  return (
    <svg ref={ref} className={`nv-nova-robot is-${mood}`} width={size} height={size} viewBox="4 1 32 36" aria-hidden="true">
      {/* Antenna: wobbles from its base */}
      <g className="nv-nova-robot__antenna">
        <line x1="20" y1="9.5" x2="20" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle className="nv-nova-robot__light" cx="20" cy="4.2" r="2.2" />
      </g>
      {/* Ears */}
      <rect x="5" y="17" width="3" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="32" y="17" width="3" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
      {/* Head */}
      <rect className="nv-nova-robot__head" x="8" y="9.5" width="24" height="21" rx="8" />
      {/* Face plate */}
      <rect x="11" y="13" width="18" height="12.5" rx="5.5" fill="rgba(10, 18, 40, 0.55)" />
      {/* Eyes */}
      <g className="nv-nova-robot__eyes" style={{ transform: `translate(${look.x}px, ${look.y}px)` }}>
        <g className="nv-nova-robot__eye">
          {mood === "happy" ? (
            <path d="M14.3 19.6 Q16.2 17.3 18.1 19.6" fill="none" stroke="#9fe8ff" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <rect x="14.6" y="16.8" width="3.2" height="4.4" rx="1.6" fill="#9fe8ff" />
          )}
        </g>
        <g className="nv-nova-robot__eye">
          {mood === "happy" ? (
            <path d="M21.9 19.6 Q23.8 17.3 25.7 19.6" fill="none" stroke="#9fe8ff" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <rect x="22.2" y="16.8" width="3.2" height="4.4" rx="1.6" fill="#9fe8ff" />
          )}
        </g>
      </g>
      {/* Mouth: a small smile, wider when happy, a pulsing bar while thinking */}
      {mood === "thinking" ? (
        <rect className="nv-nova-robot__think" x="17" y="22.6" width="6" height="1.4" rx="0.7" fill="#9fe8ff" />
      ) : (
        <path d={mood === "happy" ? "M16.6 22.4 Q20 25.4 23.4 22.4" : "M17.6 22.8 Q20 24.4 22.4 22.8"} fill="none" stroke="#9fe8ff" strokeWidth="1.3" strokeLinecap="round" />
      )}
      {/* Body hint */}
      <rect x="14" y="31.5" width="12" height="4" rx="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** A round, pulsing robot button (the Vault Map's Ask Nova). Smiles on hover. */
export function NovaRobotButton({ label, className = "", onClick }: { label: string; className?: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className={`nv-nova-robot-fab ${className}`.trim()}
      aria-label={label}
      title={label}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <NovaRobot mood={hovered ? "happy" : "idle"} size={46} />
    </button>
  );
}
