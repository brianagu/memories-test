'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ShuffledAsset } from '@/lib/shuffle';
import { VARIANTS } from '@/lib/variants';

interface MediaBlockProps {
  asset: ShuffledAsset;
}

export function MediaBlock({ asset }: MediaBlockProps) {
  const variant = VARIANTS[asset.variant];
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  // Detect if asset is video based on file extension
  const isVideo = /\.(mp4|webm|mov)$/i.test(asset.src);

  // Get image dimensions for native aspect ratio (images only)
  useEffect(() => {
    if (isVideo) return;

    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${asset.src}`);
    };
    img.src = asset.src;
  }, [asset.src, isVideo]);

  // Calculate aspect ratio from image dimensions or use variant default
  const aspectRatio = imageDimensions
    ? `${imageDimensions.width}/${imageDimensions.height}`
    : variant.mediaAspect;

  return (
    // Content grid - wraps each block in a grid row
    <div className="content-grid">
      {/* Content block container - flexible height, positioned via grid-column */}
      <motion.div
        className={`relative ${asset.variant.toLowerCase().replace('-', '-')}`}
        style={{
          gridColumn: 'var(--grid-col, ' + variant.gridColumn + ')',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: '0px 0px 0px 0px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Inner container for media + caption */}
        <div className="flex flex-col gap-4">
          {/* Media - Image or Video */}
          <motion.div
            className="relative overflow-hidden w-full"
            style={{
              aspectRatio,
            }}
            initial={{ filter: 'blur(12px)' }}
            whileInView={{ filter: 'blur(0px)' }}
            viewport={{ margin: '0px 0px 0px 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {isVideo ? (
              <video
                src={asset.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={asset.src}
                alt={asset.title}
                fill
                className="object-cover"
                sizes={`(max-width: 386px) 386px, (max-width: 853px) 853px, (max-width: 1086px) 1086px, 1320px`}
                priority={false}
              />
            )}
          </motion.div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-white" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
              <span className="font-medium" style={{ fontWeight: 500 }}>
                {asset.title}
              </span>
              <span style={{ opacity: 0.5 }}>, {asset.year}</span>
            </div>
            {asset.credit && (
              <div className="text-xs" style={{ opacity: 0.5, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                {asset.credit}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
