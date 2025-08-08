"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    text: "NeuVault completely transformed how I store and find my project files. It’s like having a personal assistant.",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "David Lee",
    role: "Small Business Owner",
    text: "Finding invoices used to take forever. Now it’s instant — and I love the privacy-first approach.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Maria Gonzalez",
    role: "Research Analyst",
    text: "The AI summaries save me hours every week. I can’t imagine working without NeuVault now.",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Michael Thompson",
    role: "Doctor",
    text: "I use NeuVault to keep track of patient records securely. The AI search is unmatched.",
    avatar: "https://i.pravatar.cc/100?img=30",
  },
  {
    name: "Sophia Lee",
    role: "Photographer",
    text: "Finally, an app that organizes my photos, contracts, and invoices without me doing anything.",
    avatar: "https://i.pravatar.cc/100?img=40",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What People Are Saying
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Real feedback from our early testers who’ve made NeuVault part of
          their daily workflow.
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
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 2.5 },
        }}
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[200px] h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <p className="text-gray-300 text-base mb-6">{item.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full border border-white/20"
                />
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
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
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      {/* Bullet Styles */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.3);
          width: 10px;
          height: 10px;
          margin: 0 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #3f8cff;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </section>
  );
}
