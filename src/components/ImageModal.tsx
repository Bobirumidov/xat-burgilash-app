"use client";
import { useState } from "react";
export default function ImageModal({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img src={src} alt={alt} className={`cursor-pointer ${className}`} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setIsOpen(false)}>
          <div className="relative max-w-4xl max-h-screen p-4">
            <button className="absolute top-0 right-0 m-4 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>&times;</button>
            <img src={src} alt={alt} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </>
  );
}
