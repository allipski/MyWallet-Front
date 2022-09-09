import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function AddButton({ icon, text, land }) {
    const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(land)}>
      <ion-icon name={icon}></ion-icon>
      <p>{text}</p>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 50%;
  height: 114px;
  padding: 10px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;

  p {
    width: 2px;
    line-break: auto;
  }

  ion-icon {
    font-size: 25px;
  }
`;
