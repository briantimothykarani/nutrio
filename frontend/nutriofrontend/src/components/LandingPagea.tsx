import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-600 via-black to-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-purple-900 bg-opacity-80">
        <div className="text-2xl font-bold text-white">Nutrio</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold">

          <li>
            <Link to="/signup" className="hover:text-purple-300 transition">Signup</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-purple-300 transition">Login</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-purple-900 bg-opacity-90 px-6 py-4 space-y-3 font-semibold">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-purple-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/athletelist" onClick={() => setMenuOpen(false)} className="block hover:text-purple-300 transition">Athletes</Link>
          </li>
          <li>
            <Link to="/addathlete" onClick={() => setMenuOpen(false)} className="block hover:text-purple-300 transition">Add Athlete</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-purple-300 transition">Login</Link>
          </li>
        </ul>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 space-y-6 max-w-3xl mx-auto flex-grow">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Nutrio<br /><span className="text-purple-400">        Your next Ai powered fitness instructor</span>
        </h1>
        <p className="text-lg text-purple-200 max-w-xl">
          Track ,Create  your fitness info in one platform
        </p>

        <Link
          to="/signup"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition px-8 py-3 rounded font-semibold shadow-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white bg-opacity-10 rounded-lg mx-6 mb-10 p-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-purple-300"></h2>
        <div className="grid md:grid-cols-3 gap-8 text-white">
          <div className="p-6 bg-purple-800 bg-opacity-60 rounded-lg shadow-lg hover:bg-purple-700 transition">
            <h3 className="text-xl font-semibold mb-2">Track your fitness goals</h3>
            <p>Set and keeep yourself accountable to achieve your gym goals</p>
          </div>
          <div className="p-6 bg-purple-800 bg-opacity-60 rounded-lg shadow-lg hover:bg-purple-700 transition">
            <h3 className="text-xl font-semibold mb-2">Create a fitness plan</h3>
            <p>Wory no more our Ai powered fitness instructor will help your create a personalized fitness plan t achieve your goals</p>
          </div>
          <div className="p-6 bg-purple-800 bg-opacity-60 rounded-lg shadow-lg hover:bg-purple-700 transition">
            <h3 className="text-xl font-semibold mb-2">Use ai as your personal trainer</h3>
            <p>Get a fitness instructor tailored to your fitness goals at a better price </p>
          </div>
        </div>
      </section>

      <div className="">
        <div className="flex">

          <div>
            <p>testimonials 1</p>
          </div>
          <div>
            <p>testimonials 2</p>
          </div>
        </div>
        <div className="flex">
          <div>
            <p>testimonials 3</p>
          </div>
          <div>
            <p>testimonials 4</p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-purple-900 bg-opacity-80 py-6 text-center text-purple-300 font-semibold">
        &copy; {new Date().getFullYear()} Nutrio. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;