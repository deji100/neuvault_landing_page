"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Ayo K.",
    role: "Small business owner",
    text: "Invoices and receipts used to be chaos. Now I know where things are, and I can find them fast without throwing everything into a generic cloud folder.",
  },
  {
    name: "Sarah J.",
    role: "Graduate student",
    text: "I scan handouts and upload PDFs, and NeuVault groups them in a way that actually makes sense later. It feels like I finally stopped losing track of my study materials.",
  },
  {
    name: "Daniel O.",
    role: "Freelancer",
    text: "The summaries are clear and practical. It feels less like storing files and more like finally being able to use what I saved.",
  },
  {
    name: "Michael T.",
    role: "Healthcare worker",
    text: "I keep personal medical documents in NeuVault. The encrypted backup and restore flow matters because changing phones is usually where trust falls apart.",
  },
  {
    name: "Chris T.",
    role: "Working professional",
    text: "Setting reminders on actual documents is the part that stands out. It is the first app that makes my paperwork feel less reactive and less easy to forget.",
  },
  {
    name: "Nneka A.",
    role: "Busy parent",
    text: "I added documents while offline and NeuVault processed them later without me babysitting the whole thing. That flow feels built for real life.",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white">
      <motion.div
        className="absolute -top-32 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[#3F8CFF]/10 blur-[140px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto mb-12 max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Early feedback
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            What people feel first.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            The strongest reactions are not about novelty. They are about relief: less clutter, less panic, faster retrieval, and a stronger sense of control over important records.
          </p>
        </motion.div>
      </div>

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
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 2.3 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={item.name}>
            <motion.div
              className="flex h-full min-h-[250px] flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
                  Early beta tester
                </div>
                <p className="text-lg leading-8 text-white/88">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-sm font-semibold text-white">
                  {getInitials(item.name)}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-white/52">{item.role}</p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="custom-pagination mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      />

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

