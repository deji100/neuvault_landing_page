import Link from "next/link";
import { ArrowRight, Bell, CalendarCheck, FileText, HardDrive, MessageSquareQuote, Mic, Network, Star } from "lucide-react";
import { productHighlights, testimonials } from "@/lib/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const reviews = testimonials;
  const icons = [FileText, Network, Bell, CalendarCheck, Mic, HardDrive];

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>The everyday difference</p>
          <h2 id="testimonials-title">Less scattered.<br /><span>More space for what matters.</span></h2>
          <p className={styles.intro}>{reviews.length ? "Stories from people making room for a clearer day." : "Six ways NeuVault helps you find, remember and use what you save."}</p>
          {reviews.length > 0 && <div className={styles.trust}><MessageSquareQuote size={17} aria-hidden="true" /><span>From people using NeuVault</span></div>}
        </header>

        <div className={styles.grid}>
          {reviews.length === 0 && productHighlights.map((item, index) => {
            const Icon = icons[index];
            return <article className={styles.card} key={item.id} data-product-benefit={item.id}>
              <div className={styles.cardTop}><span className={styles.avatar} aria-hidden="true"><Icon size={19} /></span><span className={styles.tag}>{item.feature}</span></div>
              <h3 className={styles.benefitTitle}>{item.title}</h3>
              <p className={styles.benefitCopy}>{item.copy}</p>
              <Link className={styles.benefitLink} href={item.href}>Explore {item.product} <ArrowRight size={15} aria-hidden="true" /></Link>
            </article>;
          })}
          {reviews.map(review => (
            <figure className={styles.card} key={review.id}>
              <div className={styles.cardTop}>
                {review.rating && <span className={styles.stars} role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill={index < review.rating! ? "currentColor" : "none"} aria-hidden="true" />)}
                </span>}
                <span className={styles.tag}>{review.feature}</span>
              </div>
              <blockquote><p>{review.quote}</p></blockquote>
              <figcaption>
                <span className={styles.avatar} aria-hidden="true">{review.name.split(/\s+/).map(part => part[0]).slice(0, 2).join("")}</span>
                <span className={styles.author}><strong>{review.name}</strong>{review.role && <span>{review.role}</span>}</span>
                {review.sourceUrl && <a href={review.sourceUrl} target="_blank" rel="noreferrer" className={styles.source} aria-label={`Read ${review.name}'s original review`}>Read review <ArrowRight size={13} aria-hidden="true" /></a>}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.invite}>Using NeuVault? <Link href="/open-feedback">Share your experience <ArrowRight size={15} aria-hidden="true" /></Link></p>
      </div>
    </section>
  );
}
