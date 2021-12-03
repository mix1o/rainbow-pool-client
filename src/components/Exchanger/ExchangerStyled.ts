import styled from "styled-components";

const Container = styled.div`
  margin: 100px auto;
  text-align: center;

  p {
    color: ${props => props.theme.errorMessage};
  }
  .actions {
    background: ${props => props.theme.containerColor};
    margin-top: 30px;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 2px 10px 2px ${props => props.theme.darkGray};
    position: relative;

    h5 {
      text-align: left;
      color: ${props => props.theme.darkGray};
      font-size: 15px;
    }
  }
  .buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    div {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }
  }
  .no-wrap {
    flex-wrap: nowrap;
  }
  @media screen and (min-width: 300px) {
    width: 90%;
  }
  @media screen and (min-width: 780px) {
    width: 65%;
  }
  @media screen and (min-width: 1300px) {
    width: 45%;
  }
`;

const Input = styled.input`
  border-radius: 100px;
  border: 2px solid ${props => props.theme.lightGray};
  padding: 5px 15px;
  margin: 10px 0;
  outline: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    border: 2px solid ${props => props.theme.secondaryMain};
  }
`;
const OptionButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 100px 0;
  transition: background 0.3s ease;
  background: ${props =>
    props.active ? props.theme.primaryWhite : "transparent"};
  border: 1px solid ${props => props.theme.primaryWhite};
  font-size: 16px;
  color: ${props =>
    props.active ? props.theme.primaryBlack : props.theme.primaryWhite};
  width: 100%;
  margin: 0 10px;

  &:hover {
    background-color: ${props => props.theme.primaryWhite};
    color: ${props => props.theme.primaryBlack};
  }
`;

const ActionButton = styled.button<{ correct: boolean }>`
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-weight: 900;
  margin: 40px 10px 0 10px;
  min-width: 200px;
  transition: background-color 0.4s ease-in-out, transform 0.3s ease;
  border-radius: 4px;
  background: ${props =>
    props.correct ? props.theme.primaryBlue : props.theme.gray};

  &:hover {
    transform: ${({ correct }) => (correct ? "scale(1.1)" : "none")};
  }
`;

export { Container, ActionButton, OptionButton, Input };
