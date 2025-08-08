// "use client";
// import { motion } from "framer-motion";
// import { FaFileInvoiceDollar, FaHeartbeat, FaBookOpen, FaReceipt } from "react-icons/fa";

// const scenarios = [
//   {
//     icon: <FaFileInvoiceDollar className="text-[#3F8CFF]" size={28} />,
//     title: "Business Finance",
//     description: "Track every invoice, payment, and earnings in one secure place.",
//   },
//   {
//     icon: <FaHeartbeat className="text-pink-400" size={28} />,
//     title: "Health & Medical",
//     description: "Access your health records and test results anytime, anywhere.",
//   },
//   {
//     icon: <FaBookOpen className="text-yellow-400" size={28} />,
//     title: "Study & Research",
//     description: "Organize study notes, research papers, and resources effortlessly.",
//   },
//   {
//     icon: <FaReceipt className="text-green-400" size={28} />,
//     title: "Personal Life",
//     description: "Never lose receipts, warranties, or personal documents again.",
//   },
// ];

// export default function SeeItInAction() {
//   return (
//     <section className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10">
//       {/* Background glow */}
//       <motion.div
//         className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
//         animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Section header */}
//       <div className="text-center mb-16">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           See NeuVault in Action
//         </motion.h2>
//         <motion.p
//           className="text-gray-400 max-w-2xl mx-auto"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           From finance to personal life — here’s how NeuVault helps you stay
//           organized and in control.
//         </motion.p>
//       </div>

//       {/* Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
//         {/* Left scenarios */}
//         <div className="space-y-6">
//           {scenarios.slice(0, 2).map((item, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.2, duration: 0.6 }}
//             >
//               <div className="mb-3">{item.icon}</div>
//               <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//               <p className="text-gray-400 text-sm">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile video placeholder */}
//         <motion.div
//           className="relative w-full aspect-[9/18] bg-black/30 rounded-[2rem] border border-white/10 overflow-hidden shadow-lg shadow-black/40 flex items-center justify-center"
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           {/* Placeholder play button */}
//           <motion.div
//             className="w-20 h-20 rounded-full bg-[#3F8CFF]/20 flex items-center justify-center cursor-pointer"
//             animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="#3F8CFF"
//               viewBox="0 0 24 24"
//               stroke="none"
//               className="w-10 h-10"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           </motion.div>
//         </motion.div>

//         {/* Right scenarios */}
//         <div className="space-y-6">
//           {scenarios.slice(2).map((item, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.2, duration: 0.6 }}
//             >
//               <div className="mb-3">{item.icon}</div>
//               <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//               <p className="text-gray-400 text-sm">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import { motion } from "framer-motion";
import { FaFileInvoiceDollar, FaHeartbeat, FaBookOpen, FaReceipt } from "react-icons/fa";

const scenarios = [
  {
    icon: <FaFileInvoiceDollar className="text-[#3F8CFF]" size={28} />,
    title: "Business Finance",
    description: "Track every invoice, payment, and earnings in one secure place.",
  },
  {
    icon: <FaHeartbeat className="text-pink-400" size={28} />,
    title: "Health & Medical",
    description: "Access your health records and test results anytime, anywhere.",
  },
  {
    icon: <FaBookOpen className="text-yellow-400" size={28} />,
    title: "Study & Research",
    description: "Organize study notes, research papers, and resources effortlessly.",
  },
  {
    icon: <FaReceipt className="text-green-400" size={28} />,
    title: "Personal Life",
    description: "Never lose receipts, warranties, or personal documents again.",
  },
];

export default function SeeItInAction() {
  return (
    <section className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10">
      {/* Background glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section header */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          See NeuVault in Action
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          From finance to personal life — here’s how NeuVault helps you stay
          organized and in control.
        </motion.p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
        {/* Left scenarios */}
        <div className="space-y-6">
          {scenarios.slice(0, 2).map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile video placeholder with tilt */}
        <motion.div
          className="relative w-full aspect-[9/18] bg-black/30 rounded-[2rem] border border-white/10 overflow-hidden shadow-lg shadow-black/40 flex items-center justify-center transform-gpu transition-transform duration-300 hover:rotate-1 hover:-rotate-y-3 hover:scale-[1.02]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Placeholder play button */}
          <motion.div
            className="w-20 h-20 rounded-full bg-[#3F8CFF]/20 flex items-center justify-center cursor-pointer"
            animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#3F8CFF"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-10 h-10"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Right scenarios */}
        <div className="space-y-6">
          {scenarios.slice(2).map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
