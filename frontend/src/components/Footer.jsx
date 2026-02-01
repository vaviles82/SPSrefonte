import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom"; // Import indispensable pour la navigation fluide
import BY from "../assets/blue_yellow.png";

const Footer = () => {
  return (
    <footer className="w-full font-serif font-bold text-black border-t-2 border-white">
      <div className="w-full flex flex-row justify-between h-[230px]">
        {/* Partie Bleue */}
        <div className="w-1/6 bg-[#010360]"></div>
        
        {/* Logo central */}
        <div className="flex-shrink-0">
          <img src={BY} alt="Swiss Padel Stars" className="h-[230px] w-auto object-fill" />
        </div>

        {/* Partie Jaune */}
        <div className="flex-grow bg-[#FCDA35] py-4 px-10 flex flex-col justify-between">
          <div className="flex flex-col space-y-2 mt-4 ml-10">
            {/* Utilisation de Link au lieu de <a> pour éviter le reload */}
            <Link to="/about" className="font-playfair text-xl hover:underline">About</Link>
            <Link to="/contact" className="font-playfair text-xl hover:underline">Contact</Link>
            <Link to="/newsletter" className="font-playfair text-xl hover:underline">Newsletter</Link>
            <Link to="/cgu" className="font-playfair text-xl hover:underline">CGU</Link>
          </div>
          
          {/* Réseaux sociaux : On garde <a> car ce sont des liens externes */}
          <div className="flex space-x-4 justify-end mb-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5 shadow-sm hover:scale-110 transition-transform">
              <Linkedin size={28} className="text-[#010360]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5 shadow-sm hover:scale-110 transition-transform">
              <Instagram size={28} className="text-[#010360]" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5 shadow-sm hover:scale-110 transition-transform">
              <Facebook size={28} className="text-[#010360]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;