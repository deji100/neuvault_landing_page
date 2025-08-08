// "use client";
// import { motion } from "framer-motion";
// import { FaLock, FaMagic, FaFileAlt, FaTags } from "react-icons/fa";
// import { BsStars } from "react-icons/bs";
// import { PiVaultBold } from "react-icons/pi";

// const features = [
//   {
//     title: "Private & Secure",
//     description:
//       "Everything you store is encrypted and stays on your device. Your vault is yours — always.",
//     icon: <FaLock className="text-[#3F8CFF]" size={28} />,
//   },
//   {
//     title: "Smart Summaries",
//     description:
//       "Get instant summaries for notes, documents, or scans. Our AI breaks it down so you don’t have to.",
//     icon: <BsStars className="text-yellow-400" size={28} />,
//   },
//   {
//     title: "Auto-Tag & Group",
//     description:
//       "NeuVault auto-detects content types, assigns tags, and organizes your uploads intelligently.",
//     icon: <FaTags className="text-green-400" size={28} />,
//   },
//   {
//     title: "Universal File Support",
//     description:
//       "From PDF to Word to audio and images — drop anything, and NeuVault handles the rest.",
//     icon: <FaFileAlt className="text-white" size={28} />,
//   },
//   {
//     title: "AI That Understands",
//     description:
//       "Chat with Nova, your intelligent assistant who understands your vault contents contextually.",
//     icon: <FaMagic className="text-purple-400" size={28} />,
//   },
//   {
//     title: "Beautifully Minimal",
//     description:
//       "A sleek, distraction-free experience designed to help you focus, not fumble.",
//     icon: <PiVaultBold className="text-pink-400" size={28} />,
//   },
// ];

// export default function FeaturesSection() {
//   return (
//     <section className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10">
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Why NeuVault?
//         </motion.h2>

//         <motion.p
//           className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           A privacy-first AI file vault that thinks with you — and for you.
//           Built to simplify your digital life.
//         </motion.p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-xl hover:shadow-[#3F8CFF]/20 transition"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//             >
//               <div className="mb-4">{feature.icon}</div>
//               <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400 text-sm">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import { motion } from "framer-motion";
import { FaLock, FaMagic, FaFileAlt, FaTags } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const features = [
  {
    title: "Private & Secure",
    description:
      "Everything you store is encrypted and stays on your device. Your vault is yours — always.",
    context: "No cloud snooping, no unwanted access — just your files.",
    icon: <FaLock className="text-[#3F8CFF]" size={28} />,
  },
  {
    title: "Smart Summaries",
    description:
      "Get instant summaries for notes, documents, or scans. Our AI breaks it down so you don’t have to.",
    context: "Save time by skipping the fluff — see the core points instantly.",
    icon: <BsStars className="text-yellow-400" size={28} />,
  },
  {
    title: "Auto-Tag & Group",
    description:
      "NeuVault auto-detects content types, assigns tags, and organizes your uploads intelligently.",
    context: "Your content is where it should be — without manual sorting.",
    icon: <FaTags className="text-green-400" size={28} />,
  },
  {
    title: "Universal File Support",
    description:
      "From PDF to Word to audio and images — drop anything, and NeuVault handles the rest.",
    context: "Work with all your formats in one private place.",
    icon: <FaFileAlt className="text-white" size={28} />,
  },
  {
    title: "AI That Understands",
    description:
      "Chat with Nova, your intelligent assistant who understands your vault contents contextually.",
    context: "Ask for anything — Nova knows where to find it.",
    icon: <FaMagic className="text-purple-400" size={28} />,
  },
  {
    title: "Beautifully Minimal",
    description:
      "A sleek, distraction-free experience designed to help you focus, not fumble.",
    context: "Every pixel has a purpose — no clutter, just clarity.",
    icon: <PiVaultBold className="text-pink-400" size={28} />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-24 bg-[#0B0F19] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why NeuVault?
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A privacy-first AI file vault that thinks with you — and for you.
          Built to simplify your digital life.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/30 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Icon with float animation */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="mb-4"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm mb-2">
                {feature.description}
              </p>
              <p className="text-gray-500 text-xs italic">{feature.context}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
