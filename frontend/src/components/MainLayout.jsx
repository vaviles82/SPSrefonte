import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import burgerBar from "../assets/burgerBar.png";
import Logo from "../assets/Logo.png";
import BY from "../assets/blue_yellow.png";
import Footer from "./Footer";

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="bg-white to-[#000260]/80 text-black min-h-screen w-full flex flex-col justify-between items-center">
      <nav className="bg-gradient-to-b from-[#000260]  to-blue-500 h-40 w-full shadow-lg flex items-center justify-between relative  border-b-2 border-white mb-40">
        <img
          src={burgerBar}
          alt="burgerBar"
          className="w-20 h-16 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* second bar */}

        <div className="hidden  border-white border-2 bg-yellow-300 absolute -bottom-16 md:-bottom-20 w-[100%]  h-20 md:h-28 left-1/2 -translate-x-1/2 md:flex justify-between items-center max-w-screen-lg font-bold text-lg text-black shadow-xl">
          <div className="flex justify-between  w-5/12 px-4 lg:px-8 mr-4 h-full">
            <div className="flex items-center  hover:bg-sky-700 w-full h-full text-center justify-center align-middle">
              <Link to="/events"> Events</Link>
            </div>

            <div className=" flex items-center hover:bg-sky-700 w-full h-full text-center justify-center">
              <Link to="/news"> News</Link>
            </div>

            <div className=" flex items-center hover:bg-sky-700 w-full h-full text-center justify-center ">
              <Link to="/blog"> Blog</Link>
            </div>
          </div>

          <div className=" w-2/12 h-[90%] "></div>

          <div className="flex justify-between gap-2 w-5/12 px-4 lg:px-8 lg:ml-4 h-full">
            <div className="flex items-center  hover:bg-sky-700 w-full h-full text-center justify-center align-middle">
              <Link to="/about"> About</Link>
            </div>
            <div className="flex items-center  hover:bg-sky-700 w-full h-full text-center justify-center align-middle">
              <Link to="/newsletter"> Newsletter</Link>
            </div>
            <div className="flex items-center  hover:bg-sky-700 w-full h-full text-center justify-center align-middle">
              <Link to="/contact"> Contact</Link>
            </div>
          </div>
        </div>

        {/* logo */}
        <div className="absolute top-0 w-32  md:top-[58px] lg:top-[35px] md:w-[120px] lg:w-[150px] h-auto left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link to="/">
            <img
              src={BY}
              alt="Logo"
              className="w-full h-full object-cover border-2 border-white "
            />
          </Link>
        </div>
      </nav>

      <div className="w-full flex-grow flex flex-col items-center">
        {children}
      </div>

      <Footer />
    </main>
  );
}

export default MainLayout;
