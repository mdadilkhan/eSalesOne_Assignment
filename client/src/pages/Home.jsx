import { useEffect, Suspense, lazy,useState } from "react";
import InfiniteScroll from "../components/InfiniteScroll";
const Layout = lazy(() => import("../layout/Layout"));

const Home = () => {
 
  return (
    <Layout>
        <InfiniteScroll />
    </Layout>
  );
};

export default Home;
