import styled from "styled-components";
import { FormStyle, InputStyle, ButtonStyle } from "./Login";

export default function Add() {
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
      <Header>
        <span>Nova entrada</span>
      </Header>
      <FormStyle>
        <InputStyle
          carregando={data}
          type="email"
          placeholder="Valor"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputStyle>
        <InputStyle
          carregando={data}
          type="email"
          placeholder="Descrição"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputStyle>
        <ButtonStyle carregando={data} type="submit">
          <Carregamento />
        </ButtonStyle>
      </FormStyle>
    </Wrapper>
  );
}

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
