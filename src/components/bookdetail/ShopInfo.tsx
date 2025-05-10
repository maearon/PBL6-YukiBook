import React from "react";
import { ExternalLink } from "lucide-react";

interface ShopProps {
  shop: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

export const ShopInfo: React.FC<ShopProps> = ({ shop }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow transition-shadow duration-300">
      <h3 className="text-gray-700 font-medium mb-2">Sold by</h3>
      
      <a 
        href={`/shops/${shop.id}`} 
        className="flex items-center gap-4 group"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src={shop.avatarUrl || "https://images.pexels.com/photos/3767397/pexels-photo-3767397.jpeg"}
            alt={shop.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/3767397/pexels-photo-3767397.jpeg";
            }}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
            {shop.name}
          </p>
          <p className="text-sm text-gray-500 flex items-center mt-0.5">
            <span className="group-hover:underline">Visit shop</span>
            <ExternalLink size={14} className="ml-1 opacity-70" />
          </p>
        </div>
      </a>
    </div>
  );
};