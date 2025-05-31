import { useState } from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link to="/">eShop</Link>
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <span className="text-2xl">&#9776;</span> {/* Hamburger icon */}
        </button>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              Cart
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MenuBar;
