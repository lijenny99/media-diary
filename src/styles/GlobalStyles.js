import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body, h1, h2, button, p {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
  }
  `