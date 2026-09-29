/**
 * The NeuVault app icon: the mark from updv-ui/assets/images/icon.svg on the
 * white rounded tile the installed app uses, so the site and the Dock match.
 */
export default function AppLogo({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`app-logo ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="470 458 560 584" width="66%" height="66%">
        <path
          fill="#2563eb"
          d="M642.67,692.22h0c-19.24,.21-28.57,23.62-14.75,37.01l83.74,81.1v196.36s-206.42,.17-206.42,.17l.17-393.66,205.09-.1,1.16,1.08,79.65,76.39-148.64,1.64Z"
        />
        <path
          fill="#2563eb"
          d="M857.33,807.78h0c19.24-.21,28.57-23.62,14.75-37.01l-83.74-81.1v-196.36s206.42-.17,206.42-.17l-.17,393.66-205.09,.1-1.16-1.08-79.65-76.39,148.64-1.64Z"
        />
      </svg>
    </span>
  );
}
