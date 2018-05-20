import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Spinner } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Text = Styled.div`
    font-size: 0.5rem;
    font-style: italic;
    text-transform: lowercase;
    margin-top: 3rem;
`

export default class extends React.Component {
    reload = () => {
        this.props.trigger.push(Trigger.ACTION_RELOAD, {
            status: Trigger.STATUS_ERROR,
        })
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
                <Text>loading</Text>
            </Container>
        )
    }
}
