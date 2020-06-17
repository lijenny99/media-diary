import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body, h1 {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  `