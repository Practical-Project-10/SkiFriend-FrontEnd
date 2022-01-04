import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

// import pretendard from 'pretendard';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
        font-size: 14px;
        line-height: 17px;
        background-color: rgba(var(--b3f,250,250,250),1);
        color: #000;
    }

    &::-webkit-scrollbar { display: none; /* Chrome, Safari, Opera*/ };

    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };

    hr {
        margin: 0px;
    }
`;

export default GlobalStyles;
