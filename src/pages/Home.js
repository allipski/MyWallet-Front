import styled from "styled-components";
import AddButton from "../components/AddButton";
import Transaction from "../components/Transaction";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import PersonContext from "../contexts/PersonContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { person, setPerson } = useContext(PersonContext);
  checkLogin();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  function getLocal() {
    const user = JSON.parse(localStorage.getItem("session"));
    return user;
  }

  function checkLogin() {
    if (person._id === "" && getLocal()) {
      setPerson(getLocal());
    } else if (!person) {
      alert("Sua sessão expirou! Por favor, faça o login novamente");
      navigate("/");
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${getLocal().token}`,
    },
  };

  useEffect(() => {
    getTransactions();
  }, []);

  function getTransactions() {
    axios
      .get("http://localhost:5000/transactions", config)
      .then((answer) => setTransactions(answer.data))
      .catch((error) => console.log(error));
  }

  function logout() {
    localStorage.clear();
    axios
      .delete(`http://localhost:5000/login/${person._id}`, config)
      .then(navigate("/"))
      .catch((err) => {
        console.log(err);
        alert(
          "Não foi possível fazer seu Logout. Por favor tente novamente mais tarde."
        );
      });
  }

  function getSaldo() {
    let temp = 0;
    transactions.forEach((item) => {
      if (item.type === "entrada") {
        temp += Number(item.value);
      } else {
        temp = Number(item.value);
      }
    });
    return temp;
  }

  return (
    <Wrapper>
      <Header>
        <span>Olá, {person.name}</span>
        <ion-icon name="exit-outline" onClick={logout}></ion-icon>
      </Header>

      <MainBox>
        <div>
          {transactions.map((item, index) => {
            return (
              <Transaction
                key={index}
                date={item.date}
                description={item.description}
                value={item.value}
                type={item.type}
                id={item._id}
                getTransactions={getTransactions}
              />
            );
          })}
        </div>
        <div>
          <span>SALDO</span>
          <span getSaldo={getSaldo}>
            {Number(getSaldo()).toFixed(2)}
          </span>
        </div>
      </MainBox>

      <Buttons>
        <AddButton
          icon="add-circle-outline"
          text="Nova entrada"
          type="entrada"
        />
        <AddButton
          icon="remove-circle-outline"
          text="Nova saída"
          type="saida"
        />
      </Buttons>
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

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 5px;

  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;

    span:nth-child(1) {
      font-family: "Raleway";
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
    }

    span:nth-child(2) {
      font-family: "Raleway";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: ${props => props.getSaldo >= 0 ? "#C70000" : "#03AC00"};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 13px 0 25px 0;
  gap: 15px;
`;
