import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSearchParams } from 'react-router';
import ProductGrid from "./ProdutsGrid";
import "./HomePage.css";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const urlPath = search ? `/api/products?search=${search}` : '/api/products';
        const response = await axios.get(urlPath);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getHomeData();
  }, [search]);


  return (
    <>
      <title>Home</title>
      <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}

export default HomePage;
