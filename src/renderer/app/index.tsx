import "antd/dist/antd.css";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={Router} />
    </RecoilRoot>
  );
};

export default App;
