import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate("/inputs")}>Inputs</button>
        <button onClick={() => navigate("/display")}>Display</button>
      </div>
    </div>
  );
};

export default Home;
