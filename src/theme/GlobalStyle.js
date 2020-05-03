import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *,*::after,*::before{
  margin:0;
  padding:0;
  box-sizing:border-box;
  }

  html{
  font-family: 'Montserrat', sans-serif;
    }
  
`;

export default GlobalStyle;
