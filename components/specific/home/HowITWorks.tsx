"use client";
import { motion } from "framer-motion";
import { FaTags, FaFolderOpen, FaSearch } from "react-icons/fa";
import { PiChatCircleDotsFill } from "react-icons/pi";

const UnlockIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-16 h-16 text-[#3F8CFF] mx-auto"
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.9, 1, 0.9],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 10-8 0v4M5 11h14v10H5V11z"
    />
  </motion.svg>
);

const steps = [
  {
    title: "Smart Intake & Auto-Organization",
    description:
      "Scan, upload, or type notes. NeuVault instantly tags, summarizes, and groups your content without lifting a finger.",
    icon: <FaTags className="text-[#3F8CFF]" size={28} />,
  },
  {
    title: "Your Vault, Well-Organized",
    description:
      "Access a clean, category-based view of all your files, with subcategories for faster navigation and better focus.",
    icon: <FaFolderOpen className="text-yellow-400" size={28} />,
  },
  {
    title: "Find Anything, Instantly",
    description:
      "Search by title, summary, tags, file type, or even filter offline — all without breaking your flow.",
    icon: <FaSearch className="text-green-400" size={28} />,
  },
  {
    title: "Chat with Nova",
    description:
      "Ask Nova anything about your files — from earnings reports to health records — and get instant, accurate answers.",
    icon: <PiChatCircleDotsFill className="text-purple-400" size={28} />,
    conversational: true,
  },
  {
    title: "More Magic Coming Soon",
    description:
      "Stay tuned for features like voice commands, real-time collaboration, and more.",
    icon: <UnlockIcon />,
    comingSoon: true,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 px-6 py-24 bg-transparent text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          From the moment you add a file to the moment you find it again —
          NeuVault makes the journey effortless.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className={`p-6 rounded-2xl border border-white/10 backdrop-blur-sm 
              bg-white/5 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition ${
                step.comingSoon
                  ? "flex flex-col items-center justify-center"
                  : ""
              } 
              ${step.comingSoon ? "text-center" : ""} 
              ${step.conversational ? "lg:col-span-2" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{step.description}</p>

            {step.conversational && (
              <div className="bg-black/30 p-4 rounded-lg text-sm space-y-4">
                {/* Chat 1 */}
                <div className="flex justify-end items-start gap-2">
                  <span className="bg-[#3F8CFF]/20 px-3 py-2 rounded-lg max-w-[80%]">
                    What are my business earnings over the last 5 months?
                  </span>
                  <span className="text-xs text-gray-400 self-center">You</span>
                </div>
                <div className="flex justify-start items-start gap-2">
                  <span className="text-xs text-gray-400 self-center">
                    Nova
                  </span>
                  <span className="bg-purple-400/20 px-3 py-2 rounded-lg max-w-[80%]">
                    📊 Sure! Your total earnings were <strong>$125,400</strong>.
                    Here’s the month-by-month breakdown: Jan — $22,000 | Feb —
                    $20,500 | Mar — $25,300 | Apr — $28,600 | May — $29,000.
                  </span>
                </div>

                {/* Chat 2 */}
                <div className="flex justify-end items-start gap-2">
                  <span className="bg-[#3F8CFF]/20 px-3 py-2 rounded-lg max-w-[80%]">
                    Find my latest medical results.
                  </span>
                  <span className="text-xs text-gray-400 self-center">You</span>
                </div>
                <div className="flex justify-start items-start gap-2">
                  <span className="text-xs text-gray-400 self-center">
                    Nova
                  </span>
                  <span className="bg-purple-400/20 px-3 py-2 rounded-lg max-w-[80%]">
                    🩺 I found 2 documents in your “Health” group: • Blood Test
                    — March 12 • MRI Report — July 4 Would you like me to
                    summarize them?
                  </span>
                </div>

                {/* Chat 3 */}
                <div className="flex justify-end items-start gap-2">
                  <span className="bg-[#3F8CFF]/20 px-3 py-2 rounded-lg max-w-[80%]">
                    Show invoices from February.
                  </span>
                  <span className="text-xs text-gray-400 self-center">You</span>
                </div>
                <div className="flex justify-start items-start gap-2">
                  <span className="text-xs text-gray-400 self-center">
                    Nova
                  </span>
                  <span className="bg-purple-400/20 px-3 py-2 rounded-lg max-w-[80%]">
                    💼 Found 8 invoices in “Business/Finance” from February.
                    Total amount: <strong>$12,780</strong>. Want me to export
                    them as a PDF summary?
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
