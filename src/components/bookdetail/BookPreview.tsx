import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const previewPages = [
  "https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg",
  "https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg",
  "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg",
  "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg"
];

export const BookPreview: React.FC<BookPreviewProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const nextPage = () => {
    if (currentPage < previewPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-xl animate-fadeIn">
          <div className="relative h-full">
            <Dialog.Close className="absolute right-2 top-2 z-10 rounded-full p-2 hover:bg-gray-100">
              <X size={24} />
            </Dialog.Close>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Preview Page {currentPage + 1} of 4
              </h3>
            </div>

            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <img
                src={previewPages[currentPage]}
                alt={`Preview page ${currentPage + 1}`}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`rounded-full bg-white/80 p-2 hover:bg-white ${
                    currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === previewPages.length - 1}
                  className={`rounded-full bg-white/80 p-2 hover:bg-white ${
                    currentPage === previewPages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {previewPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    currentPage === index ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};