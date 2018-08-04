import { injectGlobal } from 'styled-components'

import { Device } from '~/helpers'

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

    html, body {
      margin: 0px;
      padding: 0px;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      color: rgba(0, 0, 0, 1);
      background-color: rgba(255, 255, 255, 1);
      font-family: 'Libre Franklin', sans-serif;
      font-size:
        calc(${Device.mobile() ? '2.0 * (1vw + 1vh)' : '1.0 * (1vw + 1vh)'});
    }

    #main {
        margin: 0rem;
        padding: 0rem;
        width: 100vw;
        height: 100vh;
    }
`

export default {
    'main-color': 'rgba(0, 0, 0, 1)',
    'three-quarters-main-color': 'rgba(0, 0, 0, 0.75)',
    'half-main-color': 'rgba(0, 0, 0, 0.5)',
    'quarter-main-color': 'rgba(0, 0, 0, 0.25)',
    'sub-color': 'rgba(255, 255, 255, 1)',
    'active-color': 'rgba(240, 128, 128, 0.75)',
    'minimal-unit': '0.01rem',
    'min-small-unit': '0.1rem',
    'half-small-unit': '0.3rem',
    'small-unit': '0.5rem',
    'sub-normal-unit': '0.7rem',
    'normal-unit': '1rem',
    'sub-big-unit': '1.5rem',
    'big-unit': '2rem',
    'double-big-unit': '4rem',
    'tripple-big-unit': '6rem',
    'quadra-big-unit': '8rem',
    'penta-big-unit': '10rem',
    'one-and-half-penta-big-unit': '15rem',
    'double-penta-big-unit': '20rem',
    'maximal-unit': '25rem',
}
