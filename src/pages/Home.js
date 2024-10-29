import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import Banner from "../images/HappyFlat2.png";
import "../styles/HomeStyles.css";
//import govapi from "../api/govapi";

function Home() {
  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
        <div className="headerContainer">
          <p>
            Your <br /> Ideal <br /> home{" "}
          </p>
          <Link to="/FCalculator">
            <button>Starts Here</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
