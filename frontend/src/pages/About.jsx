import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section simple */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">À propos de SPS</h1>
        <p className="text-xl max-w-2xl mx-auto px-4">
          Votre partenaire de confiance pour le développement du Padel et des infrastructures sportives.
        </p>
      </section>

      {/* Section Contenu */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Notre Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SPS est né d'une passion pour le sport et de la volonté d'accompagner les clubs 
              et les collectivités dans la création d'espaces sportifs innovants.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nous nous spécialisons dans les structures de Padel de haute qualité, 
              alliant design moderne, durabilité et performance pour offrir la meilleure 
              expérience aux joueurs.
            </p>
          </div>
          <div className="relative h-80 md:h-full min-h-[300px] overflow-hidden rounded-xl shadow-xl">
            <img 
              src="https://terrain-sport.fr/wp-content/uploads/2022/01/Terrain-padel-modulaire-scaled.jpg" 
              alt="Terrain de Padel SPS" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Nos Valeurs</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-blue-600 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Nous ne faisons aucun compromis sur la qualité de nos matériaux.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-blue-600 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Proximité</h3>
              <p className="text-gray-600 text-sm">Un accompagnement personnalisé pour chaque projet.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Toujours à la pointe des nouvelles technologies sportives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;