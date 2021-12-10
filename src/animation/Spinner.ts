import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const scaleAndRotate = keyframes`
0% {
  transform: rotate(0deg) scale(1);
}
50% {
  transform: rotate(360deg) scale(2);
}
100% {
  transform: rotate(0deg) scale(1);
}
`;

const TransactionLoading = styled.div`
  position: fixed;
  z-index: 12;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.secondaryBlack};
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-large {
    animation: ${scaleAndRotate} 3s ease-in-out infinite;
    width: 50px;
    height: 50px;
    border: 2px solid ${props => props.theme.primaryMain};
    border-radius: 5px;
  }
`;

const Loading = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 30;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.primaryMain};
  animation: ${rotate} 2s linear infinite;
`;

const SmallSpinner = styled(Loading)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: none;
  width: 25px;
  height: 25px;
  border-color: ${props => props.theme.secondaryMain};
  border-radius: 100px;
`;

export { SmallSpinner, TransactionLoading, Loading };
