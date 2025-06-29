import React, { useState, useEffect } from 'react';
import { Pagination } from '../components/Pagination';
import { IconButton } from '../components/common/IconButton';
import { Modal } from '../components/common/Modal';
import { Shuffle, BookOpen } from 'lucide-react';

export function FeetGallery() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const imagesPerPage = 12;

  useEffect(() => {
    // Generate the list of all 38 images
    const allImagePaths = [];
    for (let i = 1; i <= 38; i++) {
      const paddedNumber = String(i).padStart(3, '0');
      allImagePaths.push(`/feets/${paddedNumber}.jpg`);
    }
    
    console.log('Generated image paths:', allImagePaths);
    console.log('Total images:', allImagePaths.length);
    
    setImageList(allImagePaths);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(imageList.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = imageList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const selectedImagePath = imageList[randomIndex];
    setSelectedImage(selectedImagePath);
    setSelectedImageIndex(randomIndex);
    setIsModalOpen(true);
  };

  const handleImageClick = (imagePath: string, index: number) => {
    setSelectedImage(imagePath);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
    setSelectedImageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cyber Feet Gallery</h1>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <IconButton
            icon={Shuffle}
            onClick={handleRandomPick}
            title="Pick Random"
          />
          <IconButton
            icon={BookOpen}
            href="https://github.com/laluka/cyberfeet.fr"
            title="Contribute"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentImages.map((imagePath, index) => {
            const actualIndex = startIndex + index;
            return (
              <div 
                key={actualIndex} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleImageClick(imagePath, actualIndex)}
              >
                <img
                  src={imagePath}
                  alt={`Feet ${String(actualIndex + 1).padStart(3, '0')}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.warn(`Failed to load image: ${imagePath}`);
                    // Optionally hide the broken image or show a placeholder
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Image Preview Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedImageIndex > 0 ? `Feet ${String(selectedImageIndex + 1).padStart(3, '0')}` : 'Random Pick'}
          </h2>
          <div className="flex justify-center">
            <img
              src={selectedImage}
              alt={`Feet ${String(selectedImageIndex + 1).padStart(3, '0')}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              onError={(e) => {
                console.warn(`Failed to load image: ${selectedImage}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
} 