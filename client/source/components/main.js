import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Trigger from '~/actions/trigger'
import Choose from './scenes/choose'
import Result from './scenes/result'

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

export default connect(state => {
    return { state }
})(
    class extends React.Component {
        scene(trigger, state) {
            if (
                !state ||
                !'status' in state ||
                !state.status ||
                !'task' in state ||
                !state.task
            ) {
                return null
            }

            switch (state.status) {
                case Trigger.STATUS_ACTIVE:
                    return <Choose trigger={trigger} state={state} />

                case Trigger.STATUS_CORRECT:
                case Trigger.STATUS_WRONG:
                    return <Result trigger={trigger} state={state} />

                default:
                    return null
            }
        }

        render() {
            return (
                <Container>
                    {this.scene(this.props.trigger, this.props.state)}
                </Container>
            )
        }
    },
)
