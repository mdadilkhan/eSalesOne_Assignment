import { useEffect, Suspense, lazy } from "react";
const Layout = lazy(() => import("../layout/Layout"));
const Cart = () => {
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <p>Items you’ve added to your cart will appear here.</p>
      </div>
    </Layout>
  );
};

export default Cart;
