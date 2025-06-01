import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlices";

const Card = ({ product }) => {
  const dispatch=useDispatch()


  return (
    <div className="border border-gray-100 rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <Link to={`/product/${product._id}`} className="flex-grow">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
      </Link>

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          onClick={() => {
            dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </button>

        <Link
          to={`/payment/${product._id}`}
          className="flex-1 bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default Card;
