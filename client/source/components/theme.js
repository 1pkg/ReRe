import { injectGlobal } from 'styled-components'

injectGlobal`
    @font-face {
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        src: local('Libre Franklin'), local('LibreFranklin-Regular'),
        url(/fonts/librefranklin-regular.ttf?v=qaLeO-2Fytg) format('truetype');
    }

    @font-face {
        font-family: 'Libre Franklin';
        font-style: italic;
        font-weight: 400;
        src: local('Libre Franklin Italic'), local('LibreFranklin-Italic'),
        url(/fonts/librefranklin-italic.ttf?v=qaLeO-2Fytg) format('truetype');
    }

    @font-face {
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 700;
        src: local('Libre Franklin Bold'), local('LibreFranklin-Bold'),
        url(/fonts/librefranklin-bold.ttf?v=qaLeO-2Fytg) format('truetype');
    }

    ::-webkit-scrollbar {
        width: 0.1rem;
    }
  
    ::-webkit-scrollbar-thumb {
        background: rgba(240, 128, 128, 0.75);
    }

    html, body, #main {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      color: rgba(0, 0, 0, 1);
      background-color: rgba(255, 255, 255, 1);
      font-family: 'Libre Franklin', sans-serif;
      font-size: calc(1vw + 1vh);
    }
`

export default {
    mainColor: 'rgba(0, 0, 0, 1)',
    threeQuartersMainColor: 'rgba(0, 0, 0, 0.75)',
    halfMainColor: 'rgba(0, 0, 0, 0.5)',
    fourthMainColor: 'rgba(0, 0, 0, 0.25)',
    subColor: 'rgba(255, 255, 255, 1)',
    activeColor: 'rgba(240, 128, 128, 0.75)',
}
