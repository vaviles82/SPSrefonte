import React from 'react';

const Article = ({ imageUrl, title, description }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <img
        src={imageUrl}
        alt={title}
        className="w-40 h-40 object-cover rounded-md"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Article;
