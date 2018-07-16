import Modernizr from 'modernizr'
import Lodash from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Styled, { ThemeProvider } from 'styled-components'

import Trigger from '~/actions/trigger'
import { Choose, Landing, Maintenance, Result, Update, Wait } from './scenes'
import Theme from './theme'

const Container = Styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    cursor: default;
`

export default connect(state => {
    return { state }
})(
    class extends React.Component {
        componentDidCatch(error, info) {
            this.props.trigger.push(Trigger.ACTION_RELOAD, {
                status: Trigger.STATUS_ERROR,
            })
        }

        scene(trigger, state) {
            if (!Modernizr.flexbox || !Modernizr.webgl) {
                return <Update />
            }

            switch (state.status) {
                case Trigger.STATUS_LAND:
                    return <Landing trigger={trigger} state={state} />

                case Trigger.STATUS_ACTIVE:
                    return <Choose trigger={trigger} state={state} />

                case Trigger.STATUS_CORRECT:
                case Trigger.STATUS_WRONG:
                    return <Result trigger={trigger} state={state} />

                case Trigger.STATUS_WAIT:
                    return <Wait trigger={trigger} state={state} />

                default:
                    return <Maintenance trigger={trigger} state={state} />
            }
        }

        render() {
            if (!Lodash.isEmpty(this.props.state)) {
                return (
                    <ThemeProvider theme={Theme}>
                        <Container>
                            {this.scene(this.props.trigger, this.props.state)}
                        </Container>
                    </ThemeProvider>
                )
            }
            return null
        }
    },
)
