import React, { useState, useEffect } from 'react';

export function FeetGallery() {
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    // Generate the list of all 25 images
    const allImagePaths = [];
    for (let i = 1; i <= 38; i++) {
      const paddedNumber = String(i).padStart(3, '0');
      allImagePaths.push(`/feets/${paddedNumber}.jpg`);
    }
    
    console.log('Generated image paths:', allImagePaths);
    console.log('Total images:', allImagePaths.length);
    
    setImageList(allImagePaths);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cyber Feet Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageList.map((imagePath, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={imagePath}
                alt={`Feet ${String(index + 1).padStart(3, '0')}`}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image: ${imagePath}`);
                  // Optionally hide the broken image or show a placeholder
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 