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
    width: ${props => props.theme['one-and-half-penta-big-unit']};
    height: ${props => props.theme['one-and-half-penta-big-unit']};
    border-top:
        ${props => props.theme['min-small-unit']}
        solid
        ${props => props.theme['active-color']};
    border-bottom:
        ${props => props.theme['min-small-unit']}
        solid
        ${props => props.theme['active-color']};
    border-radius: 100%;
    animation: ${Rotate} 1s linear infinite;
`
export default Spinner
