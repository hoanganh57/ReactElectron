import "antd/dist/antd.css";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "../views/Home";
import User from "../views/User";
import Navbar from "./Navbar";
import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <Navbar />
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </MemoryRouter>
    </RecoilRoot>
  );
};

export default App;
