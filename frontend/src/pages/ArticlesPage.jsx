import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticlesPage = ({ categoryName, title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de secours robuste (Tennis/Padel générique)
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/4/41/Campo_de_Padel.jpg";

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const filter = categoryName || "News";
        const response = await axios.get(`http://localhost:5000/api/articles?category=${filter}`);
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error(`Erreur lors du chargement des ${categoryName}:`, err);
        setError("Impossible de charger les articles.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#010360] py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
            {title}
          </h1>
          <div className="w-24 h-2 bg-[#FCDA35] mx-auto rounded-full"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#010360]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((item) => (
              <article 
                key={item.id} 
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-60 overflow-hidden bg-gray-200">
                  <img 
                    src={item.image || item.image_url || fallbackImage} 
                    alt={item.title}
                    // Cette fonction se déclenche si le lien est mort (404)
                    onError={(e) => {
                      e.target.onerror = null; // Évite les boucles infinies
                      e.target.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#FCDA35] text-[#010360] text-xs font-black px-3 py-1 rounded-md shadow-md uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#010360] mb-4 line-clamp-2 leading-tight group-hover:text-blue-700">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 italic">
                    {item.teaser || item.content}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button className="text-[#010360] font-bold text-sm hover:translate-x-2 transition-transform duration-200">
                      LIRE LA SUITE →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl shadow-inner border border-dashed border-gray-300">
            <h3 className="text-2xl font-bold text-gray-400">Aucun contenu disponible</h3>
            <p className="text-gray-500 mt-2">Revenez bientôt pour suivre nos {categoryName?.toLowerCase()} !</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArticlesPage;