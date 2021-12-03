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
`;
