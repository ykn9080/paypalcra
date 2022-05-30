import React from "react";
import "./App.css";
import PayPal from "./components/PayPal";
import Free from "./components/free";
import Home from "./components/Home";
import S3test from "./components/s3test";
import Toserver from "./components/multer";
import MultiUpload from "./components/multiUpload";
import Layout from "./Layouts/Index";
import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [value, setValue] = useState();

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/paypal" element={<PayPal />} />
        <Route path="/free" element={<Free />} />
        <Route path="/s3test" element={<S3test />} />
        <Route path="/toserver" element={<Toserver />} />
        <Route path="/multiupload" element={<MultiUpload />} />
      </Routes>
    </Layout>
  );
}

export default App;
