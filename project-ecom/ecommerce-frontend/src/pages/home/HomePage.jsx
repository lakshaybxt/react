import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductGrid from "./ProdutsGrid";
import "./HomePage.css";

function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getHomeData();
  }, []);


  return (
    <>
      <title>Home</title>
      <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
}

export default HomePage;
