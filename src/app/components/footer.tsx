import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white">CreatorConnect</h3>
          <p className="mt-3 text-sm text-gray-500">
            Helping startups grow faster by connecting them with the right
            creators.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2 text-sm">
          <a href="#flow" className="hover:text-blue-400">
            How It Works
          </a>
          <a href="#top" className="hover:text-blue-400 font-semibold">
            Sign Up
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CreatorConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
