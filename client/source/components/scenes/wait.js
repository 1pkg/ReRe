import Lodash from 'lodash'
import React from 'react'
import Styled, { keyframes } from 'styled-components'

import Trigger from '~/actions/trigger'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Spinner = Styled.div`
    border-top: 0.3rem solid gray;
    border-bottom: 0.3rem solid gray;
    border-radius: 100%;
    width: 15rem;
    height: 15rem;
    animation: ${Rotate} 1s linear infinite;
`

export default class extends React.Component {
    reload = () => {
        this.props.trigger.push(Trigger.ACTION_RELOAD, { status: null })
    }

    componentDidMount() {
        this.timeout = window.setTimeout(this.reload, WAIT_RELOAD_INTERVAL)
    }

    componentWillUnmount() {
        window.clearInterval(this.timeout)
    }

    render() {
        return (
            <Container>
                <Spinner />
            </Container>
        )
    }
}
