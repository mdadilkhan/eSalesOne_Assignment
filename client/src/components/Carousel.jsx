import React, { useState } from 'react';
import { MdKeyboardArrowRight,MdKeyboardArrowLeft } from "react-icons/md";






const Carousel = ({ images = [], thumbnail }) => {
  const [current, setCurrent] = useState(0);
  const allImages = [thumbnail, ...images];

  const next = () => setCurrent((prev) => (prev + 1) % allImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img
        src={allImages[current]}
        alt={`Product Image ${current + 1}`}
        className="w-full h-96 object-cover rounded-xl"
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow cursor-pointer"
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow cursor-pointer"
      >
        <MdKeyboardArrowRight />
      </button>

      <div className="flex gap-2 justify-center mt-4">
        {allImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumb ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`w-14 h-14 object-cover rounded-lg border-2 cursor-pointer ${
              current === idx ? 'border-blue-500' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
