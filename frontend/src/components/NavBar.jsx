import { useState } from "react";
import { Menu, X } from "lucide-react";
import BlueYellow from "../assets/blue_yellow.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-indigo-900 text-white w-full max-w-screen-xl mx-auto ">
      <div className="container mx-auto flex justify-between items-center py-4 px-20 w-full text-xl font-bold">
        <div className="hidden md:flex justify-between items-center  w-1/3">
          <a href="events" className="hover:text-yellow-400 font-playfair">
            Évènements
          </a>
          <a href="infra" className="hover:text-yellow-400 font-playfair">
            Équipements
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img src={BlueYellow} alt="Swiss Padel Stars" className="h-32 w-auto" />
          <span className="ml-2 font-semibold text-sm md:text-xl text-yellow-400 font-playfair">Swiss Padel Stars</span>
        </div>
        <div className="hidden md:flex justify-between items-center  w-1/3">
          <a href="blog" className="hover:text-yellow-400 font-playfair">
            Blog
          </a>
          <a href="contact-form" className="hover:text-yellow-400 font-playfair">
            Nous Contacter
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-indigo-800">
          <a href="#events" className="block py-2 px-4 hover:bg-indigo-700 font-playfair">
            Évènements
          </a>
          <a href="#equipements" className="block py-2 px-4 hover:bg-indigo-700 font-playfair">
            Équipements
          </a>
          <a href="#blog" className="block py-2 px-4 hover:bg-indigo-700 font-playfair">
            Blog
          </a>
          <a href="#contact" className="block py-2 px-4 hover:bg-indigo-700 font-playfair">
            Nous Contacter
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
