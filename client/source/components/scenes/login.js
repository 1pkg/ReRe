import { bind, startCase } from 'lodash'
import faker from 'faker'
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
import FacebookAuth from 'react-facebook-auth'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Copyright } from './../blocks/widgets'
import Button from './../blocks/widgets/button'
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

const FaFacebookFStyled = Styled(FaFacebookF)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

const FaUserStyled = Styled(FaUser)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

const FaUserSecretStyled = Styled(FaUserSecret)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

const FaRedoStyled = Styled(FaRedo)`
    height: ${props => props.theme[tc.snu]};
    width: ${props => props.theme[tc.snu]};
    margin: ${props => props.theme[tc.smallu]};
`

const FaCheckStyled = Styled(FaCheck)`
    height: ${props => props.theme[tc.snu]};
    width: ${props => props.theme[tc.snu]};
    margin: ${props => props.theme[tc.smallu]};
`

const FaTimesStyled = Styled(FaTimes)`
    height: ${props => props.theme[tc.snu]};
    width: ${props => props.theme[tc.snu]};
    margin: ${props => props.theme[tc.smallu]};
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

class FacebookButton extends React.Component {
    render() {
        return (
            <Button
                glyph={<FaFacebookFStyled />}
                hint="login via facebook"
                hbig={true}
            />
        )
    }
}

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
                    error: true,
                    alias: input.value,
                    full: state.full,
                }
            })
        }
    }

    facebook = async response => {
        console.log(response)
    }

    change = full => {
        this.setState(state => {
            return { error: false, alias: this.alias(), full }
        })
    }

    realias = () => {
        this.setState(state => {
            return { error: false, alias: this.alias(), full: state.full }
        })
    }

    handle = () => {
        let node = findDOMNode(this)
        let input = node.querySelector('input')
        this.setState(state => {
            return {
                error: state.error,
                alias: input.value,
                full: state.full,
            }
        })
    }

    constructor(props) {
        super(props)
        this.state = { error: false, alias: this.alias(), full: false }
    }

    alias() {
        return `${faker.name.prefix()} ${startCase(faker.random.words())}`
    }

    form() {
        if (this.state.full) {
            if (this.state.error) {
                return (
                    <Wrapper>
                        <Container>
                            <Button
                                glyph={<FaRedoStyled />}
                                action={this.realias}
                            />
                            <Button
                                glyph={<FaCheckStyled />}
                                action={this.submit}
                            />
                            <Button
                                glyph={<FaTimesStyled />}
                                action={bind(this.change, null, false)}
                            />
                        </Container>
                        <GapWrapper>
                            <ErrorInput
                                type="text"
                                value={this.state.alias}
                                onChange={this.handle}
                                placeholder="your username"
                            />
                            <ErrorMinorText>
                                please type something
                            </ErrorMinorText>
                        </GapWrapper>
                    </Wrapper>
                )
            } else {
                return (
                    <Wrapper>
                        <Container>
                            <Button
                                glyph={<FaRedoStyled />}
                                action={this.realias}
                            />
                            <Button
                                glyph={<FaCheckStyled />}
                                action={this.submit}
                            />
                            <Button
                                glyph={<FaTimesStyled />}
                                action={bind(this.change, null, false)}
                            />
                        </Container>
                        <GapWrapper>
                            <Input
                                type="text"
                                value={this.state.alias}
                                onChange={this.handle}
                                placeholder="your username"
                            />
                        </GapWrapper>
                    </Wrapper>
                )
            }
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
                        component={FacebookButton}
                    />
                    <Button
                        glyph={<FaUserStyled />}
                        action={bind(this.change, null, true)}
                        hint="login via username"
                        hbig={true}
                    />
                    <Button
                        glyph={<FaUserSecretStyled />}
                        action={this.skip}
                        hint="skip login"
                        hbig={true}
                    />
                </BorderWrapper>
                <Wrapper>{this.form()}</Wrapper>
            </Container>
        )
    }
}
