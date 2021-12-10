import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ isDark: boolean }>`
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right bottom, #2c3e50,#000)"
      : "linear-gradient(to right bottom, #db6b75,#7e87f1)"};
  min-height: 100vh;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-repeat: no-repeat;
}

a {
  color: #000;
  text-decoration: none;
  font-size: 18px;
  display: block;
  margin: 10px;
  background: #fff;
  padding: 10px;
  text-align: center;
}
a:hover{
  color: #00f;
}
.container-links {
  background: rgba(255,255,255,.2);
  max-width: fit-content;
  padding: 10px;
  min-height: 300px;
  position: fixed;
  top: 30%;
  transform: translateX(-90px);
  transition: transform .3s ease-in-out; 
  z-index: 10;

  @media screen and (max-width: 780px) {
    position: static;
    min-width: 100%;
    min-height: 50px;
    top: 0;
    transform: translateX(0);
    margin-top: 30px;
  }
}
.container-links:hover {
  transform: translateX(0px);

 
}
`;
