'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: Array<{ url: string; alternativeText?: string }>;
  initialIndex: number;
  onClose: () => void;
}

export default function ImageCarousel({
  images,
  initialIndex,
  onClose,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    },
    [onClose, goToNext, goToPrevious]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-dark/95 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-cream hover:text-sage transition-colors duration-200 p-2"
        aria-label="Close gallery"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 md:h-10 md:w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-8 z-10 text-cream hover:text-sage transition-colors duration-200 p-2"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 md:h-14 md:w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
        <div className="relative max-w-7xl max-h-full w-full h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex].url}
              alt={
                images[currentIndex].alternativeText ||
                `Image ${currentIndex + 1}`
              }
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-8 z-10 text-cream hover:text-sage transition-colors duration-200 p-2"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 md:h-14 md:w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Image Counter */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-forest-dark/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sage/30">
          <p className="text-cream font-montserrat text-sm md:text-base">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Image Caption */}
      {images[currentIndex].alternativeText && (
        <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 max-w-2xl px-4">
          <p className="text-cream text-center font-cormorant text-lg md:text-xl italic bg-forest-dark/60 backdrop-blur-sm px-6 py-3 rounded-lg">
            {images[currentIndex].alternativeText}
          </p>
        </div>
      )}

      {/* Thumbnail Navigation (Desktop) */}
      {images.length > 1 && (
        <div className="hidden md:flex absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10 gap-2 max-w-4xl overflow-x-auto overflow-y-hidden px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentIndex) {
                  setCurrentIndex(index);
                }
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-sage scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-mist'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alternativeText || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
