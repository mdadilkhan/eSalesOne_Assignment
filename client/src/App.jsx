import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Componennts
const Home = lazy(() => import("./pages/Home"));
const FallBackLoader=lazy(()=>import('./components/FallbackLoader/FallBackLoader'))
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
import "./App.css";


// axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Suspense fallback={<FallBackLoader />}>
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
            </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
