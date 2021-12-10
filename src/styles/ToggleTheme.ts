import styled from "styled-components";

export const ToggleTheme = styled.button<{ isDark: boolean }>`
  width: 40px;
  border: none;
  border-radius: 10px;
  background: ${props => props.theme.gray};
  padding: 2px;
  display: flex;
  margin: 10px 5px;
`;
export const Circle = styled.div<{ isDark: boolean }>`
  transition: transform 0.3s ease;
  border-radius: 100px;
  height: 13px;
  width: 13px;
  background: ${props => (props.isDark ? "#3478f7" : "#af86b9")};
  transform: ${props =>
    props.isDark ? "translateX(20px)" : "translateX(0px)"};
`;
