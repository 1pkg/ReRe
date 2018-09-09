import { bind, startCase } from 'lodash'
import faker from 'faker'
import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaCheck, FaRedo, FaTimes, FaUser, FaUserSecret } from 'react-icons/fa'
import FacebookAuth from 'react-facebook-auth'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Beacon, Fbauth, Simple } from './../blocks/button'
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
        await this.props.trigger.call(Trigger.ACTION_HANDSHAKE, 'Anonymous')
        dispatch(this.props.trigger)
    }

    submit = async () => {
        let node = findDOMNode(this)
        let input = node.querySelector('input')
        if (input.value.trim()) {
            await this.props.trigger.call(Trigger.ACTION_HANDSHAKE, input.value)
            dispatch(this.props.trigger)
        } else {
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
        console.log(response)
    }

    change = full => {
        this.setState(state => {
            return { ...state, error: false, alias: this.alias(), full }
        })
    }

    realias = () => {
        this.setState(state => {
            return { ...state, error: false, alias: this.alias() }
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
        this.state = { error: false, alias: this.alias(), full: false }
    }

    alias() {
        return `${faker.name.prefix()} ${startCase(faker.random.words())}`
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
                    <FacebookAuth
                        appId={FACEBOOK_ID}
                        callback={this.facebook}
                        component={Fbauth}
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
