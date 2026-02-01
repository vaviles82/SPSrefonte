import { useState } from "react";
import { Link } from "react-router-dom";
import burgerBar from "../assets/burgerBar.png";
import Logo from "../assets/Logo.png";
import BY from "../assets/blue_yellow.png";
import Footer from "./Footer";

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Changement du fond ici : bg-slate-50 pour un aspect moins "vide" que le blanc */
    <main className="bg-slate-50 text-black min-h-screen w-full flex flex-col justify-between items-center">
      
      {/* Navbar intégrée */}
      <nav className="bg-gradient-to-b from-[#000260] to-blue-500 h-40 w-full shadow-lg flex items-center justify-between relative border-b-2 border-white mb-40">
        <img
          src={burgerBar}
          alt="burgerBar"
          className="w-20 h-16 md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Barre de navigation Jaune (Desktop) */}
        <div className="hidden border-white border-2 bg-yellow-300 absolute -bottom-16 md:-bottom-20 w-[100%] h-20 md:h-28 left-1/2 -translate-x-1/2 md:flex justify-between items-center max-w-screen-lg font-bold text-lg text-black shadow-xl">
          <div className="flex justify-between w-5/12 px-4 lg:px-8 mr-4 h-full">
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/events" className="w-full h-full flex items-center justify-center">Events</Link>
            </div>
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/news" className="w-full h-full flex items-center justify-center">News</Link>
            </div>
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/blog" className="w-full h-full flex items-center justify-center">Blog</Link>
            </div>
          </div>

          <div className="w-2/12 h-[90%]"></div>

          <div className="flex justify-between gap-2 w-5/12 px-4 lg:px-8 lg:ml-4 h-full">
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/about" className="w-full h-full flex items-center justify-center">About</Link>
            </div>
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/newsletter" className="w-full h-full flex items-center justify-center">Newsletter</Link>
            </div>
            <div className="flex items-center hover:bg-blue-600 hover:text-white transition-colors w-full h-full text-center justify-center">
              <Link to="/contact" className="w-full h-full flex items-center justify-center">Contact</Link>
            </div>
          </div>
        </div>

        {/* Logo Central */}
        <div className="absolute top-0 w-32 md:top-[58px] lg:top-[35px] md:w-[120px] lg:w-[150px] h-auto left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
          <Link to="/">
            <img
              src={BY}
              alt="Logo"
              className="w-full h-full object-cover border-2 border-white shadow-md"
            />
          </Link>
        </div>

        {/* Menu Mobile simplifié */}
        {isOpen && (
          <div className="absolute top-40 left-0 w-full bg-[#000260] text-white flex flex-col items-center md:hidden z-50 shadow-2xl">
            <Link to="/events" className="py-4 border-b border-blue-400 w-full text-center" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/news" className="py-4 border-b border-blue-400 w-full text-center" onClick={() => setIsOpen(false)}>News</Link>
            <Link to="/contact" className="py-4 w-full text-center" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* Zone de contenu des pages */}
      <div className="w-full flex-grow flex flex-col items-center px-4">
        {children}
      </div>

      <Footer />
    </main>
  );
}

export default MainLayout;