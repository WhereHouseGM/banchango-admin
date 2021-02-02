import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    @font-face {
        font-family: 'notosans-Regular';
        font-style: normal;
        font-weight: 400;
        src: url('https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2') format('woff2'),
        url('https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff') format('woff'),
        url('https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf') format('opentype');
    }
    body {
        font-family: 'notosans-Regular', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export default GlobalStyles;
