import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../../../assets/icon.svg";

const User = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 className="text-center">User</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <button type="button" onClick={() => navigate("/")}>
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Home
        </button>
      </div>
    </div>
  );
};

export default React.memo(User);
