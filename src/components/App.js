import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PersonContext from "../contexts/PersonContext";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import AddTransaction from "../pages/AddTransaction";


export default function App() {

  const [person, setPerson] = useState({
    _id: "",
    name: "",
    email: "",
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
            <Route path="/transaction/:operation/:transactionType" element={<AddTransaction />} />
          </Routes>
        </PersonContext.Provider>
      </BrowserRouter>
    </>
  );
}
