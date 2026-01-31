function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Bienvenue chez Swiss Padel Stars</h1>
      <p className="text-xl text-gray-700 max-w-2xl">
        Découvrez le padel en Suisse avec nos installations premium et nos tournois exclusifs.
      </p>
      <button className="mt-8 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
        Découvrir nos clubs
      </button>
    </div>
  );
}
export default Home;