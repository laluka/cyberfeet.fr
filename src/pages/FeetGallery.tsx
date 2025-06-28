import React, { useState, useEffect } from 'react';

// Explicitly import all images to ensure we get all 10
const feetImages = import.meta.glob('/feets/*.jpg', { eager: true });

export function FeetGallery() {
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    // Convert the imported images object to an array of URLs
    const images = Object.keys(feetImages).map(path => path);
    
    // Sort by filename to ensure consistent order
    images.sort();
    
    // Debug: log what images were found
    console.log('Found images:', images);
    console.log('Total images found:', images.length);
    
    // If we don't have all 10 images, manually add them
    if (images.length < 10) {
      const allImagePaths = [];
      for (let i = 1; i <= 10; i++) {
        const paddedNumber = String(i).padStart(3, '0');
        allImagePaths.push(`/feets/${paddedNumber}.jpg`);
      }
      console.log('Manually added images:', allImagePaths);
      setImageList(allImagePaths);
    } else {
      setImageList(images);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Feet Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageList.map((imagePath, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={imagePath}
                alt={`Feet ${String(index + 1).padStart(3, '0')}`}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 