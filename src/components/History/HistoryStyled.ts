import styled from "styled-components";

const ContainerHistory = styled.div`
  margin: 100px auto;
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  min-width: 30%;
  flex-wrap: wrap;
`;
const ButtonData = styled.button<{ active: boolean }>`
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 5px;
  background: ${props =>
    props.active ? props.theme.primaryBlue : props.theme.primaryWhite};
  color: ${props =>
    props.active ? props.theme.primaryWhite : props.theme.primaryBlack};

  &:hover {
    background-color: ${props => props.theme.primaryBlue};
    color: ${props => props.theme.primaryWhite};
  }
`;

const Data = styled.div`
  background: ${props => props.theme.containerColor};
  margin: 20px auto;
  padding: 10px;
  min-height: 100px;
  border-radius: 10px;

  .heading {
    text-transform: capitalize;
    color: ${props => props.theme.darkGray};
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

const HistoryDetail = styled.div`
  padding: 10px;
  background: rgba(126, 135, 241, 0.8);
  margin: 10px;
  min-width: 40%;
  color: ${props => props.theme.primaryWhite};
  border-radius: 4px;

  p {
    margin-top: 5px;
  }
  p:first-child {
    font-size: 16px;
    font-weight: 900;
  }
  @media screen and (max-width: 780px) {
    width: 100%;
  }
`;

const ContainerDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

export {
  ContainerButtons,
  ContainerHistory,
  ButtonData,
  Data,
  HistoryDetail,
  ContainerDetails,
};
