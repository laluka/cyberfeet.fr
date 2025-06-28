import React from 'react';

const feetImages = [
  '/feets/001.jpg',
  '/feets/002.jpg',
  '/feets/003.jpg',
  '/feets/004.jpg',
  '/feets/005.jpg',
  '/feets/006.jpg',
  '/feets/007.jpg',
  '/feets/008.jpg',
];

export function FeetGallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Feet Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {feetImages.map((imagePath, index) => (
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