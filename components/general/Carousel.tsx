import React from "react";

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
      <div className="max-w-screen-xl p-4 mx-auto overflow-hidden">
        <div className="flex animate-scroll gap-12 min-w-[200%]">
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Logo ${i + 1}`}
              className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
