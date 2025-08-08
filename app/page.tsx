import Hero from "@/components/specific/home/Hero";
import FeaturesSection from "@/components/specific/home/FeatureCards";
import HowItWorks from "@/components/specific/home/HowITWorks";
import SeeItInAction from "@/components/specific/home/Proof";
import WaitlistCTA from "@/components/specific/home/Waitlist";
import TestimonialsSection from "@/components/specific/home/Testimonials";
import FloatingDownloadButtons from "@/components/specific/home/FloatingDownloadButtons";
import Footer from "@/components/specific/home/Footer";
import FloatingBlobs from "@/components/specific/home/FloatingBlobs";
import Navbar from "@/components/general/Navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar />

      <Hero />

      {/* Wrap the rest in relative so blobs position correctly */}
      <section className="relative overflow-hidden bg-[#0B0F19]">
        {/* Blobs will now appear behind these sections */}
        <FloatingBlobs />

        <WaitlistCTA />
        <FeaturesSection />
        <HowItWorks />
        <SeeItInAction />
        <TestimonialsSection />
        <FloatingDownloadButtons />
      </section>

      <Footer />
    </main>
  );
}
