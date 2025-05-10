import React from "react";

interface PriceTagProps {
  price: number;
  discount?: number;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, discount }) => {
  const formattedPrice = price.toLocaleString() + "₫";
  
  if (!discount) {
    return (
      <div className="mt-2">
        <p className="text-3xl font-bold text-amber-600">
          {formattedPrice}
        </p>
      </div>
    );
  }
  
  const discountedPrice = price - (price * discount / 100);
  const formattedDiscountedPrice = discountedPrice.toLocaleString() + "₫";
  
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <p className="text-3xl font-bold text-amber-600">
          {formattedDiscountedPrice}
        </p>
        <span className="ml-3 text-sm px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">
          {discount}% OFF
        </span>
      </div>
      <p className="text-sm text-gray-500 line-through mt-1">
        {formattedPrice}
      </p>
    </div>
  );
};