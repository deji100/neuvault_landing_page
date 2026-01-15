"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Ayo K.",
    role: "Small Business Owner",
    text: "Invoices and receipts used to be chaos. Now NeuVault keeps everything organized, and I can find what I need instantly — without handing my documents to a server.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sarah Johnson",
    role: "Graduate Student",
    text: "I scan class documents and handouts, and NeuVault groups them automatically. When I’m stressed, being able to search fast is everything.",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Daniel O.",
    role: "Freelancer",
    text: "The summaries are clean and actually useful. It feels like my documents finally make sense — not just stored somewhere.",
    avatar: "https://i.pravatar.cc/100?img=18",
  },
  {
    name: "Michael Thompson",
    role: "Healthcare Worker",
    text: "I keep personal medical documents in NeuVault. I like that I can back up encrypted and restore on a new phone without exposing anything.",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Chris T.",
    role: "Working Professional",
    text: "I use resurfacing reminders for important documents and renewals. It’s the first app that actually brings the right file back at the right time.",
    avatar: "https://i.pravatar.cc/100?img=50",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle background glow */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Early Testers Are Saying
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Feedback from people using NeuVault to organize real-world documents —
          privately, locally, and fast.
        </motion.p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{ delay: 3800, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 2.5 },
        }}
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] h-full hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              viewport={{ once: true }}
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-[#6DD1FF] text-2xl leading-none mb-2">
                  “
                </div>
                <p className="text-gray-200 text-base leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Person */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full border border-white/20"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-semibold text-white leading-tight">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 leading-tight">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Bullets */}
      <motion.div
        className="custom-pagination mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        viewport={{ once: true }}
      />

      {/* Bullet Styles */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.28);
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 999px;
          transition: all 0.25s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #3f8cff;
          width: 22px;
          height: 10px;
        }
      `}</style>
    </section>
  );
}
