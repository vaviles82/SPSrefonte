import React from 'react';

const CGU = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 border-b pb-4">Conditions Générales d'Utilisation</h1>
      
      <p className="mb-6 text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">1. Présentation du site</h2>
        <p className="leading-relaxed">
          Le site <strong>SPS (Sport Padel Service)</strong> a pour objet de fournir des informations sur l'ensemble des activités, 
          services et produits proposés par la société. En utilisant ce site, vous acceptez pleinement les présentes CGU.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">2. Propriété intellectuelle</h2>
        <p className="leading-relaxed">
          Tous les éléments du site (logos, textes, images, design) sont la propriété exclusive de SPS. 
          Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">3. Données personnelles (RGPD)</h2>
        <p className="leading-relaxed">
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. 
          Lors de votre inscription à notre <strong>newsletter</strong>, votre adresse email est conservée de manière sécurisée 
          et n'est jamais transmise à des tiers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">4. Responsabilité</h2>
        <p className="leading-relaxed">
          SPS s'efforce de fournir des informations aussi précises que possible. Toutefois, l'entreprise ne pourra être 
          tenue responsable des omissions ou des lacunes dans la mise à jour des informations.
        </p>
      </section>

      <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm">
          Pour toute question, vous pouvez nous contacter via la page <a href="/contact" className="text-blue-600 underline">Contact</a>.
        </p>
      </div>
    </div>
  );
};

export default CGU;