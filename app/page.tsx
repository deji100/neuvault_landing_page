import Hero from "@/components/specific/home/Hero";
import FeaturesSection from "@/components/specific/home/FeatureCards";
import HowItWorks from "@/components/specific/home/HowITWorks";
import SeeItInAction from "@/components/specific/home/Proof";
import WaitlistCTA from "@/components/specific/home/Waitlist";
import TestimonialsSection from "@/components/specific/home/Testimonials";
import FloatingDownloadButtons from "@/components/specific/home/FloatingDownloadButtons";
import FloatingBlobs from "@/components/specific/home/FloatingBlobs";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <section className="relative overflow-hidden bg-transparent">
        <FloatingBlobs />
        <SeeItInAction />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <WaitlistCTA />
        <FloatingDownloadButtons />
      </section>
    </main>
  );
}
