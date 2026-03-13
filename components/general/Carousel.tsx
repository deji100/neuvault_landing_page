import Image from "next/image";

export default function Carousel() {
  const logos = [
    "https://wso2.cachefly.net/wso2/sites/all/image_resources/choreo/logo_university-of-edinburgh.webp",
    "https://wso2.cachefly.net/wso2/sites/all/image_resources/choreo/logo_zeomega.webp",
    "https://wso2.cachefly.net/wso2/sites/all/image_resources/choreo/logo_clearitt.webp",
    "https://wso2.cachefly.net/wso2/sites/all/image_resources/choreo/logo_fator.webp",
    "https://wso2.cachefly.net/wso2/sites/all/image_resources/choreo/logo_clearitt.webp",
  ];

  return (
    <div className="overflow-hidden bg-background py-8">
      <div className="mx-auto max-w-screen-xl overflow-hidden p-4">
        <div className="flex min-w-[200%] animate-scroll gap-12">
          {[...logos, ...logos].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Logo ${i + 1}`}
              width={240}
              height={48}
              className="h-12 w-auto object-contain"
              unoptimized
            />
          ))}
        </div>
      </div>
    </div>
  );
}
