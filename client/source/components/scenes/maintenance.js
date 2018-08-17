import React from 'react'
import Styled from 'styled-components'

import dispatch from '~/dispatch'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const SubContainer = Styled.div``

const MainText = Styled.div`
    font-size: ${props => props.theme['sub-big-unit']};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`

const MinorText = Styled.div`
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    reload = async () => {
        dispatch(this.props.trigger)
    }

    componentDidMount() {
        this.interval = window.setInterval(
            this.reload,
            MAINTENANCE_RELOAD_INTERVAL,
        )
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <MainContainer>
                <SubContainer>
                    <MainText>yikes</MainText>
                    <MainText>it seems</MainText>
                    <MainText>we are doing</MainText>
                    <MainText>maintenance</MainText>
                    <MainText>right now</MainText>
                </SubContainer>
                <SubContainer>
                    <MinorText>it should take few minutes</MinorText>
                    <MinorText>comeback few minutes later</MinorText>
                    <MinorText>or</MinorText>
                    <MinorText>wait for auto refresh</MinorText>
                </SubContainer>
            </MainContainer>
        )
    }
}
