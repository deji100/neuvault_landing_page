"use client";

import { motion } from "framer-motion";
import {
  FaPlusCircle,
  FaLightbulb,
  FaLayerGroup,
  FaSearch,
  FaCalendarCheck,
} from "react-icons/fa";
import { PiChatCircleDotsFill } from "react-icons/pi";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
  conversational?: boolean;
};

const steps: Step[] = [
  {
    title: "1. Add",
    description:
      "Drop in documents, scan paper, write notes, or record or upload voice notes. Add things the way you already do — NeuVault adapts to you.",
    icon: <FaPlusCircle className="text-[#3F8CFF]" size={28} />,
  },
  {
    title: "2. Understand",
    description:
      "NeuVault reads what you add and gives you clear summaries and key details so you instantly know what each item is about.",
    icon: <FaLightbulb className="text-yellow-400" size={28} />,
  },
  {
    title: "3. Organize",
    description:
      "Documents are automatically placed into the right groups and subgroups. You can link related files when they belong together.",
    icon: <FaLayerGroup className="text-green-400" size={28} />,
  },
  {
    title: "4. Find",
    description:
      "Search by title, tags, content, type, or date. Filters are fast and work even when you’re offline.",
    icon: <FaSearch className="text-emerald-400" size={28} />,
  },
  {
    title: "5. Ask & Act",
    description:
      "Use the assistant to ask questions, set reminders, detect deadlines, export summaries, or explore related info on the web.",
    icon: <PiChatCircleDotsFill className="text-purple-400" size={28} />,
    conversational: true,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 px-6 py-24 bg-transparent text-white border-t border-white/10"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-left md:text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How NeuVault Fits Into Your Life
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl md:mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          A simple flow — from capturing information to acting on it at the
          right time.
        </motion.p>
      </div>

      {/* Grid: 3 / 3 / 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className={[
              "p-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5",
              "hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition-transform duration-300 hover:-translate-y-1",
              "text-left",
              step.conversational ? "lg:col-span-2" : "",
            ].join(" ")}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{step.icon}</div>

            <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{step.description}</p>

            {/* Assistant demo only in last card */}
            {step.conversational && (
              <>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <FaCalendarCheck />
                  <span>
                    Ask across documents, get insight, then act if you want
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-lg text-sm space-y-4">
                  {/* User */}
                  <div className="flex justify-end items-start gap-2">
                    <span className="bg-[#3F8CFF]/20 px-3 py-2 rounded-lg max-w-[80%]">
                      Do I have anything related to my move to Canada?
                    </span>
                    <span className="text-xs text-gray-400 self-center">
                      You
                    </span>
                  </div>

                  {/* Assistant */}
                  <div className="flex justify-start items-start gap-2">
                    <span className="text-xs text-gray-400 self-center">
                      NeuVault
                    </span>
                    <span className="bg-purple-400/20 px-3 py-2 rounded-lg max-w-[80%]">
                      🌍 I found 6 related items across your vault: • Visa
                      application PDF • Passport scan • University admission
                      letter • Medical exam receipt • Proof of funds document •
                      A voice note titled “Canada checklist” Want a timeline
                      summary or reminders for the next steps?
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
