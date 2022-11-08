import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../../../assets/icon.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 className="text-center">Home</h1>
      <div className="Hello">
        <button type="button" onClick={() => window.api.sendMessage("test")}>
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </button>
      </div>
      <div className="Hello">
        <button
          type="button"
          onClick={() => window.api.createService("https://web.telegram.org/")}
        >
          Create Service
        </button>
      </div>
      <div className="Hello">
        <button type="button" onClick={() => navigate("/user")}>
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          User
        </button>
      </div>
    </div>
  );
};

export default React.memo(Home);
