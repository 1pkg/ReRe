import Styled, { keyframes as Keyframes } from 'styled-components'

const Rotate = Keyframes`
    0% {
        transform: rotate(0deg);
    };
    100% {
        transform: rotate(360deg);
    };
`

const Spinner = Styled.div`
    border-top: 0.3rem solid ${props => props.theme['active-color']};
    border-bottom: 0.3rem solid ${props => props.theme['active-color']};
    border-radius: 100%;
    width: 15rem;
    height: 15rem;
    animation: ${Rotate} 1s linear infinite;
`
export default Spinner
