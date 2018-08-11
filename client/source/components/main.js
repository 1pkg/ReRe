import Modernizr from 'modernizr'
import { isEmpty } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Styled, { ThemeProvider } from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, Revenue } from '~/helpers'
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
            Revenue.pause()
            Analytic.event(error, info)
            this.props.trigger.push(Trigger.ACTION_RELOAD, {
                status: Trigger.STATUS_ERROR,
            })
        }

        scene(trigger, state) {
            if (!Modernizr.flexbox || !Modernizr.webgl) {
                Revenue.pause()
                Analytic.view(Analytic.VIEW_UPDATE)
                return <Update />
            }

            switch (state.status) {
                case Trigger.STATUS_LAND:
                    Revenue.pause()
                    Analytic.view(Analytic.VIEW_LAND)
                    return <Landing trigger={trigger} state={state} />

                case Trigger.STATUS_ACTIVE:
                    Revenue.resume()
                    Analytic.view(Analytic.VIEW_CHOOSE)
                    return <Choose trigger={trigger} state={state} />

                case Trigger.STATUS_CORRECT:
                case Trigger.STATUS_WRONG:
                    Revenue.resume()
                    Analytic.view(Analytic.VIEW_RESULT)
                    return <Result trigger={trigger} state={state} />

                case Trigger.STATUS_WAIT:
                    Analytic.view(Analytic.VIEW_WAIT)
                    return <Wait trigger={trigger} state={state} />

                default:
                    Revenue.pause()
                    Analytic.view(Analytic.VIEW_MAINTENANCE)
                    return <Maintenance trigger={trigger} state={state} />
            }
        }

        render() {
            if (!isEmpty(this.props.state)) {
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
