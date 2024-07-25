import React from 'react';

const SearchResultBar = ({ resultInput }) => {
  return (
    <div className="flex items-center gap-4 mb-4 p-2 border-b border-gray-200">
      <img className="w-16 h-16 rounded object-cover" src={resultInput.imgUrl} alt={resultInput.title} />
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{resultInput.title}</h2>
        <p className="text-gray-500">Precio: ${resultInput.price}</p>
      </div>
    </div>
  );
};

export default SearchResultBar;
