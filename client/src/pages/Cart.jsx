import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Layout from "../layout/Layout";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlices";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartDetails);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();

  // Select all by default
  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  }, [cartItems]);

  const handleSelect = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  };

  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(item._id)
  );

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [selectedProducts]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setSelectedItems([]);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
          
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <Checkbox
                checked={selectedItems.length === cartItems.length}
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < cartItems.length
                }
                onChange={toggleSelectAll}
              >
                Select All
              </Checkbox>
              <span className="ml-2 text-gray-600">
                ({selectedItems.length} of {cartItems.length} selected)
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-2/3">
                    <Checkbox
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelect(item._id)}
                    />
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ₹ {item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-semibold"
                        >
                          −
                        </button>
                        <span className="text-md font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right space-y-2 flex flex-col items-center">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="flex items-center text-red-500 hover:text-red-700 text-sm cursor-pointer"
                    >
                      <FaTrashAlt/>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedItems.length > 0 && (
              <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold text-gray-800">
                  Total: ₹ {totalPrice.toFixed(2)}
                </div>
                <Link
                  to="/payment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Proceed to Payment
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
