import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cerebri Sans';
    font-style: normal;
    font-weight: 400;
    src: url(${require('../assets/fonts/cerebri-sans-regular.eot')});
    src: url(${require('../assets/fonts/cerebri-sans-regular.eot?#iefix')}) format('embedded-opentype'),
        url(${require('../assets/fonts/cerebri-sans-regular.woff2')}) format('woff2'),
        url(${require('../assets/fonts/cerebri-sans-regular.woff')}) format('woff'),
        url(${require('../assets/fonts/cerebri-sans-regular.ttf')}) format('truetype');
  }
  @font-face {
    font-family: 'Cerebri Sans';
    font-style: normal;
    font-weight: 500;
    src: url(${require('../assets/fonts/cerebri-sans-medium.eot')});
    src: url(${require('../assets/fonts/cerebri-sans-medium.eot?#iefix')}) format('embedded-opentype'),
        url(${require('../assets/fonts/cerebri-sans-medium.woff2')}) format('woff2'),
        url(${require('../assets/fonts/cerebri-sans-medium.woff')}) format('woff'),
        url(${require('../assets/fonts/cerebri-sans-medium.ttf')}) format('truetype');
  }
  @font-face {
    font-family: 'Cerebri Sans';
    font-style: normal;
    font-weight: 700;
    src: url(${require('../assets/fonts/cerebri-sans-bold.eot')});
    src: url(${require('../assets/fonts/cerebri-sans-bold.eot?#iefix')}) format('embedded-opentype'),
        url(${require('../assets/fonts/cerebri-sans-bold.woff2')}) format('woff2'),
        url(${require('../assets/fonts/cerebri-sans-bold.woff')}) format('woff'),
        url(${require('../assets/fonts/cerebri-sans-bold.ttf')}) format('truetype');
  }

  * {
    box-sizing: border-box;
    font-family: ${props => props.theme.sansSerif};
    font-size: 18px;
    ${'' /* @media (max-width: ${props => props.theme.breakSmall}) {
      font-size: 16px;
    } */}
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    background-color: ${props => props.theme.goldPale};
    color: ${props => props.theme.black};
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0 0;
    font-family: ${props => props.theme.sansSerif};
  }

  h1 {
    margin-top: 2.5rem;
    font-size: 2.441rem;
  }

  h2 {
    margin-top: 2rem;
    font-size: 1.953rem;
  }

  h3 {
    margin-top: 1.6rem;
    font-size: 1.563rem;
  }

  h4 {
    margin-top: 1.28rem;
    font-size: 1.25rem;
  }

  h5 {
    margin-top: 1.024rem;
    font-size: 1rem;
  }

  h6 {
    font-size: 0.8rem;
  }

  p {
    margin: 0.5rem 0 1rem;
    line-height: 1.5;
  }

  a {
    color: ${props => props.theme.black};
  }
`;

export default GlobalStyle;
