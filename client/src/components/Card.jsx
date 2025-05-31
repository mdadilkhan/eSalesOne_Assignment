import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>

      </Link>
    </div>
  );
};

export default Card;