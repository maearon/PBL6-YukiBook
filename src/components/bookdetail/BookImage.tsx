import React, { useState } from "react";

interface BookImageProps {
  imageUrl: string;
  altText: string;
}

export const BookImage: React.FC<BookImageProps> = ({ imageUrl, altText }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Fallback image
  const fallbackImage = "https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg";
  
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-full max-w-md">
        <div 
          className={`
            overflow-hidden rounded-xl shadow-lg transition-all duration-300
            ${isZoomed ? 'shadow-xl' : 'shadow-md'}
          `}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={imageUrl || fallbackImage}
            alt={altText}
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
            className={`
              w-full h-[500px] object-cover transition-transform duration-700 ease-out
              ${isZoomed ? 'scale-110' : 'scale-100'}
            `}
          />
        </div>
        
        {/* Image caption */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded text-sm shadow-sm">
          <span className="font-medium">Book Cover</span>
        </div>
      </div>
    </div>
  );
};