import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel"; // import the carousel component
const Layout = lazy(() => import("../layout/Layout"));
const API_URL = import.meta.env.VITE_API_URI;
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products/${id}`);
        if (isMounted) {
          setProduct(data);
          setStatus("success");
        }
      } catch {
        if (isMounted) setStatus("error");
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (status === "loading") return <p className="p-4">Loading...</p>;
  if (status === "error")
    return <p className="p-4 text-red-600">Failed to load product.</p>;
  if (!product) return null;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl">
        <Carousel images={product.images} thumbnail={product.thumbnail} />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-2">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Category: <span className="capitalize">{product.category}</span>
          </p>
          <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
          <p className="text-lg font-semibold text-green-600 mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer">
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
