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
        width: 0.0rem;
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
const mainc = 'main-color'
const tqmc = 'three-quarters-main-color'
const hmc = 'half-main-color'
const qmc = 'quarter-main-color'
const subc = 'sub-color'
const activec = 'active-color'
const zu = 'zero-unit'
const minu = 'minimal-unit'
const msu = 'min-small-unit'
const hsu = 'half-small-unit'
const smallu = 'small-unit'
const snu = 'sub-normal-unit'
const normalu = 'normal-unit'
const sbu = 'sub-big-unit'
const bigu = 'big-unit'
const dbu = 'double-big-unit'
const tbu = 'tripple-big-unit'
const qbu = 'quadra-big-unit'
const pbu = 'penta-big-unit'
const oahpbu = 'one-and-half-penta-big-unit'
const dpbu = 'double-penta-big-unit'
const maxu = 'maximal-unit'

export const tc = {
    mainc,
    tqmc,
    hmc,
    qmc,
    subc,
    activec,
    zu,
    minu,
    msu,
    hsu,
    smallu,
    snu,
    normalu,
    sbu,
    bigu,
    dbu,
    tbu,
    qbu,
    pbu,
    oahpbu,
    dpbu,
    maxu,
}

export const theme = {
    [mainc]: 'rgba(0, 0, 0, 1)',
    [tqmc]: 'rgba(0, 0, 0, 0.75)',
    [hmc]: 'rgba(0, 0, 0, 0.5)',
    [qmc]: 'rgba(0, 0, 0, 0.25)',
    [subc]: 'rgba(255, 255, 255, 1)',
    [activec]: 'rgba(240, 128, 128, 0.75)',
    [zu]: '0rem',
    [minu]: '0.01rem',
    [msu]: '0.1rem',
    [hsu]: '0.3rem',
    [smallu]: '0.5rem',
    [snu]: '0.7rem',
    [normalu]: '1rem',
    [sbu]: '1.5rem',
    [bigu]: '2rem',
    [dbu]: '4rem',
    [tbu]: '6rem',
    [qbu]: '8rem',
    [pbu]: '10rem',
    [oahpbu]: '15rem',
    [dpbu]: '20rem',
    [maxu]: '25rem',
}
