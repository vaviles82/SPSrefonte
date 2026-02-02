import { useEffect, useState } from "react";
import axios from "axios";

function AdminsDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Appel vers ton API backend
    axios.get("http://localhost:5000/api/articles")
      .then(res => setArticles(res.data))
      .catch(err => console.error("Erreur articles", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Articles</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded">+ Ajouter un article</button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Titre</th>
            <th className="p-3 border">Catégorie</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(art => (
            <tr key={art.id}>
              <td className="p-3 border">{art.title}</td>
              <td className="p-3 border">{art.category}</td>
              <td className="p-3 border text-blue-600 cursor-pointer">Modifier | Supprimer</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminsDashboard;