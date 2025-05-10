import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  onClick: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex items-center justify-center w-full py-3.5 px-6 rounded-full 
        text-lg font-medium transition-all duration-300
        ${isHovered 
          ? 'bg-amber-600 text-white shadow-lg transform -translate-y-0.5' 
          : 'bg-amber-500 text-white shadow'}
      `}
    >
      <ShoppingCart 
        size={20} 
        className={`mr-2 transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`} 
      />
      <span>Add to Cart</span>
      
      {/* Button background animation */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
    </button>
  );
};