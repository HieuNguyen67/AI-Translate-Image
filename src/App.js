import React, { useState } from "react";
import axios from "axios";
import Home from "./page/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <div className="container">
      <div className="mt-5 pt-5"></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
