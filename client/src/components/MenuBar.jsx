import { useState } from "react";
import { Link } from "react-router-dom";
import AuthDialog from "./AuthDialog";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Badge } from "antd";
import { setUser } from "../store/slices/authSlices";
import toast from "react-hot-toast";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.authDetails);
  const { cartItems } = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null)); // Clear user
    toast.success("Logout successfull");
    setIsModalOpen(false);
  };
  return (
    <>
<nav className="bg-white shadow-md px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            <Link to="/">eShop</Link>
          </h1>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <span className="text-2xl">&#9776;</span>
          </button>
          <ul className="hidden md:flex space-x-6">
            <li>
              {currentUser && currentUser.name ? (
                <p
                  onClick={() => setIsModalOpen(true)}
                  className="group w-7 h-7 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center font-semibold transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </p>
              ) : (
                <button
                  className="relative text-gray-800 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300 cursor-pointer"
                  onClick={() => {
                    setShowAuthDialog(true);
                    setIsOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </li>

            <li>
              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300 cursor-pointer"
              >
                <Badge
                  count={cartItems?.length || 0}
                  size="small"
                  offset={[0, 2]}
                >
                  <FaShoppingCart className="text-2xl" />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>

        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            <li>
              {currentUser && currentUser.name ? (
                <p
                  onClick={() => setIsModalOpen(true)}
                  className="group w-7 h-7 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center font-semibold transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </p>
              ) : (
                <button
                  className="relative text-gray-800 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300 cursor-pointer"
                  onClick={() => {
                    setShowAuthDialog(true);
                    setIsOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="relative text-gray-800 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300 cursor-pointer"
              >
                 <Badge
                  count={cartItems?.length || 0}
                  size="small"
                  offset={[0, 2]}
                >
                  <FaShoppingCart className="text-2xl" />
                </Badge>
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <AuthDialog
        show={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />

      <Modal
        title="Logout"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default MenuBar;
