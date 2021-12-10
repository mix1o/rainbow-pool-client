import styled from "styled-components";

const HeaderContainer = styled.header`
  background: ${props => props.theme.opacityWhite};
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .container-theme {
    display: flex;
    align-items: center;
  }
`;

const Heading = styled.h3`
  background-image: linear-gradient(
    to left,
    violet,
    indigo,
    blue,
    green,
    yellow,
    orange,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 23px;
`;

const HeaderButton = styled.button<{ background?: boolean }>`
  border: none;
  padding: 10px 15px;
  border-radius: 100px;
  margin-right: 10px;
  background: ${props =>
    props.background ? props.theme.secondaryBlue : props.theme.lightGray};
  color: ${props =>
    props.background ? props.theme.primaryWhite : props.theme.primaryBlack};
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const DetailsContainer = styled.div`
  margin: 10px 0;
  color: #fff;
  span {
    color: ${props => props.theme.gray};
  }
`;

export { DetailsContainer, HeaderButton, Heading, HeaderContainer };
