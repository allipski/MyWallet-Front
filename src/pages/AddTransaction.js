import styled from "styled-components";
import { FormStyle, InputStyle, ButtonStyle } from "./Login";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import PersonContext from "../contexts/PersonContext";

export default function Add() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const { operation, transactionType } = useParams();
  const navigate = useNavigate();
  const { person } = useContext(PersonContext); 
  const config = {
    headers: {
      Authorization: `Bearer ${person.token}`,
    },
  };

  function addEntry(event) {
    event.preventDefault();
    setData(null);
    axios
      .post("http://localhost:5000/transactions", {
        date: dayjs().locale("pt-br").format("DD/MM"),
        value: value,
        description: description,
        type: `${transactionType === "entrada" ? "entrada" : "saida"}`
      }, config)
      .then((answer) => {
        setData(answer);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setData("");
        alert("Não foi possível salvar sua transação. Por favor tente novamente mais tarde.");
        setDescription("");
        setValue("");
        setData("");
      });
  }

  function changeEntry(event) {
    event.preventDefault();
    setData(null);
    axios
      .put("http://localhost:5000/transactions", {
        date: dayjs().locale("pt-br").format("DD/MM"),
        value: value,
        description: description,
        type: `${transactionType === "entrada" ? "entrada" : "saida"}`
      }, config)
      .then((answer) => {
        setData(answer);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setData("");
        alert("Não foi possível salvar sua transação. Por favor tente novamente mais tarde.");
        setDescription("");
        setValue("");
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
      return `${operation === "add" ? "Salvar" : "Atualizar"} ${transactionType === "entrada" ? "entrada" : "saída"}`;
    }
  }

  return (
    <Wrapper>
      <Header>
        <span>{operation === "add" ? "Nova" : "Editar"} {transactionType === "entrada" ? "entrada" : "saída"}</span>
      </Header>
      <FormStyle onSubmit={operation === "add" ? addEntry : changeEntry}>
        <InputStyle
          carregando={data}
          type="text"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></InputStyle>
        <InputStyle
          carregando={data}
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></InputStyle>
        <ButtonStyle carregando={data} type="submit">
          <Carregamento />
        </ButtonStyle>
      </FormStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 100%;
  min-height: 100vh;
  background-color: #8c11be;

  form {
    width: 100%;
    margin-top: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 25px 0;

  span,
  ion-icon {
    font-family: "Raleway", sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
  }

  ion-icon {
    font-size: 32px;
  }
`;
