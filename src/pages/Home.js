import styled from "styled-components";
import AddButton from "../components/AddButton";

export default function Home() {
  return (
    <Wrapper>
      <Header>
        <span>Olá, Fulano</span>
        <ion-icon name="exit-outline"></ion-icon>
      </Header>

      <MainBox>
        {/* <Transaction date={date} description={description} value={value} /> */}
      </MainBox>

      <Buttons>
        <AddButton icon="add-circle-outline" text="Nova entrada" land="/add" />
        <AddButton icon="remove-circle-outline" text="Nova saída" land="/remove" />
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

  span, ion-icon {
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
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 13px 0 25px 0;
  gap: 15px;
`;