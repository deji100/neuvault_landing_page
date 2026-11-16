# Homepage testimonial section

The section follows the supplied reference: centered heading, feature tags, individual star ratings, short quotes and reviewer attribution in a responsive three/two/one-column grid. It uses the landing page palette in light and dark mode and sits after the four live demos.

`lib/testimonials.ts` contains two separate arrays:

- `testimonials`: genuine customer feedback approved for publication. Currently empty. Keep the reviewer's words/name and any actual rating; an optional original-review link appears on the card. Do not infer star ratings or invent identities.
- `previewTestimonials`: six illustrative layout examples. The development server displays these only when genuine testimonials are absent. Each card and the section disclose that these are samples. The requested “Layout preview · Sample testimonials” badge has been removed.

Production renders no section while the approved array is empty. Do not publish the samples as customer endorsements. No aggregate score, customer total, verification badge or third-party rating is invented. Adding real entries makes the section appear in production after the next build.

Checked desktop/tablet/mobile layouts in light and dark themes, sample labels and absence of the removed badge. Production HTML is checked for absence of sample quotes and section markup.
