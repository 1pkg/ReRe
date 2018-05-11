import React from 'react'
import { connect } from 'react-redux'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Choose, Maintenance, Result } from './scenes'

const Container = Styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

export default connect(state => {
    return { state }
})(
    class extends React.Component {
        componentDidCatch(error, info) {
            this.props.trigger.push(Trigger.ACTION_RELOAD, {})
        }

        scene(trigger, state) {
            if (!state || !('status' in state)) {
                return <Maintenance trigger={trigger} state={state} />
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
