"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/mock-data";

export function ProductImage({
  product,
  className,
  emojiClassName,
  sizes,
}: {
  product: Product;
  className?: string;
  emojiClassName?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!product.image || failed) {
    return (
      <span aria-hidden className={emojiClassName}>
        {product.emoji}
      </span>
    );
  }

  // Admin-uploaded photos are stored as base64 data URLs — next/image's
  // optimizer doesn't handle those, so render a plain <img> for them.
  if (product.image.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes ?? "(max-width: 768px) 50vw, 20vw"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
