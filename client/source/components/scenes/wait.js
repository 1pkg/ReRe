import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic } from '~/helpers'
import { Spinner } from './../blocks/other'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default class extends React.Component {
    reload = () => {
        Analytic.error(`waiting over ${WAIT_RELOAD_INTERVAL} ...`)
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
            </Container>
        )
    }
}
