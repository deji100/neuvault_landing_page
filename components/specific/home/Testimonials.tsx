import Link from "next/link";
import { ArrowRight, MessageSquareQuote, Star } from "lucide-react";
import { previewTestimonials, testimonials } from "@/lib/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const preview = testimonials.length === 0 && process.env.NODE_ENV === "development";
  const reviews = preview ? previewTestimonials : testimonials;
  if (reviews.length === 0) return null;

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-title" data-testimonials-preview={preview || undefined}>
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>The everyday difference</p>
          <h2 id="testimonials-title">Less scattered.<br /><span>More space for what matters.</span></h2>
          <p className={styles.intro}>Stories from people making room for a clearer day.</p>
          {!preview && <div className={styles.trust}><MessageSquareQuote size={17} aria-hidden="true" /><span>From people using NeuVault</span></div>}
          {preview && <p className={styles.previewNote}>Illustrative quotes and ratings for this preview. These are not customer reviews and will not appear on the live site.</p>}
        </header>

        <div className={styles.grid}>
          {reviews.map(review => (
            <figure className={styles.card} key={review.id}>
              <div className={styles.cardTop}>
                {review.rating && <span className={styles.stars} role="img" aria-label={`${preview ? "Sample rating: " : ""}${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill={index < review.rating! ? "currentColor" : "none"} aria-hidden="true" />)}
                </span>}
                <span className={styles.tag}>{review.feature}</span>
              </div>
              <blockquote><p>{review.quote}</p></blockquote>
              <figcaption>
                <span className={styles.avatar} aria-hidden="true">{preview ? <MessageSquareQuote size={19} /> : review.name.split(/\s+/).map(part => part[0]).slice(0, 2).join("")}</span>
                <span className={styles.author}><strong>{review.name}</strong>{review.role && <span>{review.role}</span>}</span>
                {preview ? <span className={styles.sample}>Sample</span> : review.sourceUrl && <a href={review.sourceUrl} target="_blank" rel="noreferrer" className={styles.source} aria-label={`Read ${review.name}'s original review`}>Read review <ArrowRight size={13} aria-hidden="true" /></a>}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.invite}>Using NeuVault? <Link href="/open-feedback">Share your experience <ArrowRight size={15} aria-hidden="true" /></Link></p>
      </div>
    </section>
  );
}
