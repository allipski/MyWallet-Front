import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PersonContext from "../contexts/PersonContext";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Add from "../pages/Add";

export default function App() {

  const [person, setPerson] = useState({
    id: "",
    name: "",
    image: "",
    email: "",
    password: "",
    token: "",
  });
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <PersonContext.Provider value={{ person, setPerson }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </PersonContext.Provider>
      </BrowserRouter>
    </>
  );
}
