import {
    Wrapper,
    FormStyle,
    LinkStyle,
    ButtonStyle,
    InputStyle,
  } from "./Login";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { useState } from "react";
  import { ThreeDots } from "react-loader-spinner";
  
  export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirma, setConfirma] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    const navigate = useNavigate();
  
  
    function postCadastro(event) {
      event.preventDefault();
      setData(null);
      axios
        .post(
          "http://localhost:5000/cadastro",
          {
            name: name,
            email: email,
            password: password,
            confirma: confirma,
          }
        )
        .then((answer) => {setData(answer); navigate("/");})
        .catch((err) => {console.log(err , {
            name: name,
            email: email,
            password: password,
            confirma: confirma,
          }); alert("Não foi possível fazer o seu cadastro. Tem certeza que você não possui uma conta?"); setEmail(""); setPassword(""); setData(""); setConfirma(""); setName("")});
    }
  
    function Carregamento() {
      if (data === null) {
        return (
          <ThreeDots
            height="70"
            width="70"
            radius="9"
            color="#FFFFFF"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        );
      } else {
        return "Cadastrar";
      }
    }
  
    return (
      <Wrapper>
        <span>My Wallet</span>
        <FormStyle onSubmit={postCadastro}>
        <InputStyle carregando={data}
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></InputStyle>
          <InputStyle carregando={data}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></InputStyle>
          <InputStyle carregando={data}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></InputStyle>
          <InputStyle carregando={data}
            type="password"
            placeholder="Confirme a senha"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
          ></InputStyle>
          <ButtonStyle carregando={data} type="submit"><Carregamento /></ButtonStyle>
        </FormStyle>
        <LinkStyle>
          <Link to="/">Já tem uma conta? Entre agora!</Link>
        </LinkStyle>
      </Wrapper>
    );
  }