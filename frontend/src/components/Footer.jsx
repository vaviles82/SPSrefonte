import { Facebook, Instagram, Linkedin } from "lucide-react";
import BY from "../assets/blue_yellow.png";

const Footer = () => {
  return (
    <footer className="w-full max-w-screen-xl mx-auto font-serif font-bold text-black">
      <div className="w-full flex flex-row justify-between h-[230px]">
        <div className="w-1/6 bg-[#010360]"></div>
        <div className="">
          <img src={BY} alt="Swiss Padel Stars" className="h-[230px] w-auto object-fill" />
        </div>

        <div className="w-3/4 bg-[#FCDA35] py-4 px-4 flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 ml-32">
            <a href="/about" className="font-playfair text-xl hover:underline">
              About
            </a>
            <a href="/contact" className="font-playfair text-xl hover:underline">
              Contact
            </a>
            <a href="/newsletter" className="font-playfair text-xl hover:underline">
              Newsletter
            </a>
            <a href="/cgu" className="font-playfair text-xl hover:underline">
              CGU
            </a>
          </div>
          <div className="flex space-x-4 justify-end">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5">
              <Linkedin size={28} className="text-indigo-900" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5">
              <Instagram size={28} className="text-indigo-900" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-900">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded p-1.5">
              <Facebook size={28} className="text-indigo-900" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
