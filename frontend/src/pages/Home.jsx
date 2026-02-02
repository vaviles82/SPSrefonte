import React from "react";
// Nous ne supprimons pas les imports au cas où tu en aurais besoin plus tard, 
// mais nous ne les utilisons plus dans le rendu car ils sont gérés par MainLayout.
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
  return (
    /* 1. On change bg-gray-50 en bg-transparent pour voir le fond du Layout */
    <div className="min-h-screen bg-transparent text-gray-900 w-full">
      
      {/* 2. On a retiré <Navbar /> d'ici car il est déjà dans MainLayout */}

      {/* Hero Section */}
      <section className="relative bg-[#000260] text-white py-20 px-10 flex flex-col items-center text-center w-full">
        <h1 className="text-5xl font-extrabold mb-4">Swiss Padel Stars</h1>
        <p className="text-xl max-w-2xl mb-8">
          Découvrez l'excellence du Padel en Suisse. Terrains premium, tournois internationaux et coaching de haut niveau.
        </p>
        <div className="flex gap-4">
          <button className="bg-yellow-300 text-[#000260] px-6 py-3 rounded-md font-bold hover:bg-yellow-400 transition">
            Réserver un terrain
          </button>
          <button className="border-2 border-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-[#000260] transition">
            Nos Tournois
          </button>
        </div>
      </section>

      {/* Presentation Section */}
      <section className="py-16 px-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-3 text-[#000260]">Installations Premium</h3>
          <p className="text-gray-600">Terrains indoor et outdoor dernière génération homologués par la fédération.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-3 text-[#000260]">Académie de Padel</h3>
          <p className="text-gray-600">Des coachs certifiés pour vous accompagner, du débutant au joueur de compétition.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-3 text-[#000260]">Événements Corporate</h3>
          <p className="text-gray-600">Organisez vos séminaires et team-building dans un environnement dynamique.</p>
        </div>
      </section>

      {/* Image placeholders */}
      <section className="py-16 px-10 bg-blue-900/5 text-center w-full">
        <h2 className="text-3xl font-bold mb-8 text-[#000260]">Galerie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          
          {[
            { name: "Cour de Padel", img: "https://padeloccitanie.com/media/images/upload/img4.jpg" },
            { name: "Club House", img: "https://www.padel-rennais.com/sites/padel-rennais.com/files/club-house_0.jpg" },
            { name: "Espace Détente", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400" },
            { name: "Boutique", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400" }
          ].map((item, index) => (
            <div key={index} className="group relative h-48 overflow-hidden rounded-lg shadow-md bg-gray-200">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold uppercase tracking-wider">{item.name}</span>
              </div>
            </div>
          ))}
          
        </div>
      </section>

      {/* 3. On a retiré <Footer /> d'ici car il est déjà dans MainLayout */}

    </div>
  );
}

export default Home;