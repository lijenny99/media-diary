import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body, h1 {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    transition: all 0.25s linear;
  }
  `