import { useEffect, useState } from 'react';
import Article from '../components/Article';

const ArticlesPage = ({ categoryName, title }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // On récupère les articles de l'API (à créer côté backend)
    fetch(`http://localhost:3000/api/articles?category=${categoryName}`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, [categoryName]);

  return (
    <div className="py-10 space-y-8">
      <h1 className="text-3xl font-bold text-center text-[#000260]">{title}</h1>
      {articles.length > 0 ? (
        articles.map(art => (
          <Article 
            key={art.id}
            title={art.title}
            description={art.teaser}
            imageUrl={art.image || "https://via.placeholder.com/150"}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Aucun article dans cette catégorie pour le moment.</p>
      )}
    </div>
  );
};

export default ArticlesPage;