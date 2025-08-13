import React, { useState } from "react";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = () => {
    const newPhoto = { id: Date.now(), title: "Sample Photo" };
    setPhotos([...photos, newPhoto]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Gallery</h2>
      <button
        onClick={handleAddPhoto}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
      >
        Add Photo
      </button>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id} className="p-2 border-b">{photo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
