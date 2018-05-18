import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import dispatch from '~/dispatch'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const SubContainer = Styled.div``

const MainText = Styled.div`
    font-size: ${props => (props.mobile ? '3rem' : '5rem')};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`

const MinorText = Styled.div`
    font-size: 1rem;
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    reload = () => {
        dispatch(this.props.trigger)
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
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
            <Container>
                <SubContainer>
                    <MainText mobile={Device.mobile()}>Yikes ...</MainText>
                    <MainText mobile={Device.mobile()}>it seems</MainText>
                    <MainText mobile={Device.mobile()}>we are doing</MainText>
                    <MainText mobile={Device.mobile()}>maintenance</MainText>
                    <MainText mobile={Device.mobile()}>right now</MainText>
                </SubContainer>
                <SubContainer>
                    <MinorText>it should take few minutes</MinorText>
                    <MinorText>comeback few minutes later</MinorText>
                    <MinorText>or</MinorText>
                    <MinorText>keep tab open for auto refresh</MinorText>
                </SubContainer>
            </Container>
        )
    }
}
