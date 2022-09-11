import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PersonContext from "../contexts/PersonContext";
import axios from "axios";

export default function Transaction({ date, description, value, type, id, getTransactions }) {
  const navigate = useNavigate();
  const { person } = useContext(PersonContext); 
  const config = {
    headers: {
      Authorization: `Bearer ${person.token}`,
    },
  };

  function deleteEntry() {
    axios
      .delete(
        `http://localhost:5000/transactions/${id}`, config)
      .then(getTransactions)
      .catch((err) => {
        console.log(err);
        alert(
          "Não foi possível salvar sua transação. Por favor tente novamente mais tarde."
        );
      });
  }
  function confirmDelete(event){
    event.preventDefault();
    if (window.confirm("Tem certeza que deseja deletar essa transação? Essa ação não pode ser desfeita.")) {
      deleteEntry();
    }
  }

  return (
    <Wrapper>
      <Date>{date}</Date>
      <Description
        onClick={() =>
          navigate(
            `/transaction/editar/${
              type === "entrada" ? "entrada" : "saida"
            }`, {state : { id: id } }
          )
        }
      >
        {description}
      </Description>
      <Value type={type}>{Number(value).toFixed(2)}</Value>
      <p onClick={confirmDelete}>x</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px;
  width: 100%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  p {
    color: #c6c6c6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 5%;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 18%;
  color: #c6c6c6;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 62%;
  color: #000000;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  color: ${(props) => (props.type === "entrada" ? "#03AC00" : "#C70000")};
`;
