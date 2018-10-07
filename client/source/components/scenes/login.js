import { bind } from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import {
    FaCheck,
    FaFacebookF,
    FaRedo,
    FaTimes,
    FaUser,
    FaUserSecret,
} from 'react-icons/fa'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Analytic, Identify } from '~/helpers'
import { Beacon, Simple } from './../blocks/button'
import { Copyright } from './../blocks/other'
import { tc } from '~/theme'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const GapWrapper = Styled(Wrapper)`
    margin: ${props => props.theme[tc.normalu]};
`

const BorderWrapper = Styled(Wrapper)`
    border-right:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
`

const Input = Styled.input`
    font-size: ${props => props.theme[tc.snu]};
    text-align: center;
    margin-top: ${props => props.theme[tc.sbu]};
`

const ErrorInput = Styled(Input)`
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.activec]};
`

const ErrorMinorText = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
    color: ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    skip = async () => {
        let state = await this.props.trigger.call(
            Trigger.ACTION_HANDSHAKE,
            'Anonymous',
        )
        this.dispatch(state.token)
    }

    submit = async () => {
        let node = findDOMNode(this)
        let input = node.querySelector('input')
        if (input.value.trim()) {
            let state = await this.props.trigger.call(
                Trigger.ACTION_HANDSHAKE,
                input.value,
            )
            this.dispatch(state.token)
        } else {
            Analytic.event(Analytic.EVENT_EMPTY, { type: 'login' })
            this.setState(state => {
                return {
                    ...state,
                    error: true,
                    alias: input.value,
                }
            })
        }
    }

    facebook = async response => {
        let state = await this.props.trigger.call(
            Trigger.ACTION_HANDSHAKE,
            response.name,
            response.userID,
        )
        this.dispatch(state.token)
    }

    dispatch(token) {
        if (token) {
            dispatch(this.props.trigger)
        } else {
            this.props.trigger.push(Trigger.ACTION_RELOAD, {
                status: Trigger.STATUS_ERROR,
            })
        }
    }

    change = full => {
        this.setState(state => {
            this.realias()
            return { ...state, full }
        })
    }

    realias = () => {
        this.setState(state => {
            return { ...state, error: false, alias: Identify.alias() }
        })
    }

    handle = () => {
        let node = findDOMNode(this)
        let input = node.querySelector('input')
        this.setState(state => {
            return { ...state, alias: input.value }
        })
    }

    constructor(props) {
        super(props)
        this.state = { error: false, alias: Identify.alias(), full: false }
    }

    input() {
        if (this.state.error) {
            return (
                <GapWrapper>
                    <ErrorInput
                        type="text"
                        value={this.state.alias}
                        onChange={this.handle}
                        placeholder="your username"
                    />
                    <ErrorMinorText>please type something</ErrorMinorText>
                </GapWrapper>
            )
        } else {
            return (
                <GapWrapper>
                    <Input
                        type="text"
                        value={this.state.alias}
                        onChange={this.handle}
                        placeholder="your username"
                    />
                </GapWrapper>
            )
        }
    }

    form() {
        if (this.state.full) {
            return (
                <Wrapper>
                    <Container>
                        <Simple glyph={FaRedo} action={this.realias} />
                        <Simple glyph={FaCheck} action={this.submit} />
                        <Simple
                            glyph={FaTimes}
                            action={bind(this.change, null, false)}
                        />
                    </Container>
                    {this.input()}
                </Wrapper>
            )
        }
        return null
    }

    render() {
        return (
            <Container>
                <Copyright />
                <BorderWrapper>
                    <FacebookLogin
                        appId={FACEBOOK_ID}
                        callback={this.facebook}
                        render={props => (
                            <Beacon
                                glyph={FaFacebookF}
                                hint="login via facebook"
                                action={props.onClick}
                            />
                        )}
                    />
                    <Beacon
                        glyph={FaUser}
                        hint="login via username"
                        action={bind(this.change, null, true)}
                    />
                    <Beacon
                        glyph={FaUserSecret}
                        hint="skip login"
                        action={this.skip}
                    />
                </BorderWrapper>
                <Wrapper>{this.form()}</Wrapper>
            </Container>
        )
    }
}
