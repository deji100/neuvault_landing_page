"use client";
import { motion } from "framer-motion";

export default function WaveBackground() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-40 -z-10"
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#10141F"
          fillOpacity="1"
          d="M0,64L60,90.7C120,117,240,171,360,186.7C480,203,600,181,720,165.3C840,149,960,139,1080,160C1200,181,1320,235,1380,261.3L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
    </motion.div>
  );
}
