import Modernizr from 'modernizr'
import { isEmpty } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Styled, { ThemeProvider } from 'styled-components'
import { IconContext } from 'react-icons'

import Trigger from '~/actions/trigger'
import { Analytic, History, Revenue } from '~/helpers'
import {
    Choose,
    Home,
    Login,
    Maintenance,
    Rating,
    Result,
    Splash,
    Update,
    Wait,
} from './scenes'
import { theme, tc } from '~/theme'

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
            Analytic.error(error)
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
                case Trigger.STATUS_SPLASH:
                    Revenue.pause()
                    Analytic.view(Analytic.VIEW_SPLASH)
                    return <Splash trigger={trigger} state={state} />

                case Trigger.STATUS_HOME:
                    Revenue.resume()
                    Analytic.view(Analytic.VIEW_HOME)
                    History.push(Trigger.STATUS_HOME)
                    return <Home trigger={trigger} state={state} />

                case Trigger.STATUS_LOGIN:
                    Revenue.pause()
                    Analytic.view(Analytic.VIEW_LOGIN)
                    return <Login trigger={trigger} state={state} />

                case Trigger.STATUS_RATING:
                    Revenue.resume()
                    Analytic.view(Analytic.VIEW_RATING)
                    History.push(Trigger.STATUS_RATING)
                    return <Rating trigger={trigger} state={state} />

                case Trigger.STATUS_ACTIVE:
                    Revenue.resume()
                    Analytic.view(Analytic.VIEW_CHOOSE)
                    History.push(state.task.label)
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
                    <ThemeProvider theme={theme}>
                        <IconContext.Provider
                            value={{ size: theme[tc.normalu] }}
                        >
                            <Container>
                                {this.scene(
                                    this.props.trigger,
                                    this.props.state,
                                )}
                            </Container>
                        </IconContext.Provider>
                    </ThemeProvider>
                )
            }

            return null
        }
    },
)
