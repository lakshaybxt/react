import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductGrid from "./ProdutsGrid";
import "./HomePage.css";

function HomePage({ cart }) {
  const [ products, setProducts ] = useState([]);

  // we use useEffect so it run only once not everytime 
  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <title>Home</title>
      <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}

export default HomePage;
