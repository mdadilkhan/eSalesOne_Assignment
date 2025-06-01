// components/InfiniteScrollProducts.jsx
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {throttle} from "lodash";
import Card from "./Card";
import FallbackLoader from "./FallbackLoader/FallBackLoader";


const API_URL = import.meta.env.VITE_API_URI;

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products?page=${page}`);
      const newProducts = res.data.products;

      setProducts((prev) => [...prev, ...newProducts]);

      if (newProducts.length === 0 || page >= res.data.totalPages) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on first render
  useEffect(() => {
    fetchProducts();
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        fetchProducts();
      }
    }, 300),
    [hasMore, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && !loading && <p>No products found.</p>}
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      {loading && <FallbackLoader />}
      {!hasMore && products.length > 0 && (
        <p className="text-center mt-4 text-gray-500">No more products found.</p>
      )}
    </>
  );
};

export default InfiniteScroll;
