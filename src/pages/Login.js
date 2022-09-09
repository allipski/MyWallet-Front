import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import PersonContext from "../contexts/PersonContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const { setPerson } = useContext(PersonContext);
  const navigate = useNavigate();

  function postLogin(event) {
    event.preventDefault();
    setData(null);
    axios
      .post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        }
      )
      .then((answer) => {
        setData(answer);
        navigate("/home");
        setPerson(answer.data);
      })
      .catch((err) => {
        console.log(err);
        setData("");
        alert("Email ou senha incorretos, revise seus dados e tente novamente");
        setEmail("");
        setPassword("");
        setData("");
      });
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
      return "Entrar";
    }
  }

  return (
    <Wrapper>
      <span>My Wallet</span>
      <FormStyle onSubmit={postLogin}>
        <InputStyle
          carregando={data}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputStyle>
        <InputStyle
          carregando={data}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></InputStyle>
        <ButtonStyle carregando={data} type="submit">
          <Carregamento />
        </ButtonStyle>
      </FormStyle>
      <LinkStyle>
        <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
      </LinkStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #8C11BE;

  span {
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 30px;
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 12px;
`;

const InputStyle = styled.input`
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  width: 100%;
  height: 45px;
  padding: 11px;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 400;
  background-color: ${(props) =>
    props.carregando === null ? "#F2F2F2" : "#FFFFFF"};
  color: #000000;
`;

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  background-color: #A328D6;
  opacity: ${(props) => (props.carregando === null ? 0.7 : 1)};
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 45px;
`;

const LinkStyle = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  text-decoration: none;
  margin: 35px;

  a {
    text-decoration: none;
    color: #FFFFFF;
    font-weight: 700;
  }
`;

export { Wrapper, FormStyle, LinkStyle, ButtonStyle, InputStyle };