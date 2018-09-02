import { bind } from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import {
    FaCheck,
    FaFacebookF,
    FaRedo,
    FaTimes,
    FaTwitter,
    FaUser,
    FaUserSecret,
} from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Identify } from '~/helpers'
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

const LeftWrapper = Styled(Wrapper)`
    margin-right: ${props => props.theme[tc.normalu]};
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

const FaTwitterStyled = Styled(FaTwitter)`
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

const Input = Styled.input`
    font-size: ${props => props.theme[tc.normalu]};
`

const ErrorInput = Styled(Input)`
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.activec]};
`

const ErrorMinorText = Styled.div`
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
    color: ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    skip = async () => {
        await this.props.trigger.call(Trigger.ACTION_HANDSHAKE)
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
                    type: state.type,
                }
            })
        }
    }

    change = type => {
        this.setState(state => {
            return { error: false, alias: Identify.alias(), type }
        })
    }

    realias = () => {
        this.setState(state => {
            return { error: false, alias: Identify.alias(), type: state.type }
        })
    }

    handle = () => {
        let node = findDOMNode(this)
        let input = node.querySelector('input')
        this.setState(state => {
            return {
                error: state.error,
                alias: input.value,
                type: state.type,
            }
        })
    }

    constructor(props) {
        super(props)
        this.state = { error: false, alias: Identify.alias(), type: null }
    }

    form() {
        switch (this.state.type) {
            case 'username':
                if (this.state.error) {
                    return (
                        <Container>
                            <LeftWrapper>
                                <ErrorInput
                                    type="text"
                                    value={this.state.alias}
                                    onChange={this.handle}
                                    placeholder="your username"
                                />
                                <ErrorMinorText>
                                    please type something
                                </ErrorMinorText>
                            </LeftWrapper>

                            <Button glyph={<FaRedo />} action={this.realias} />
                            <Button glyph={<FaCheck />} action={this.submit} />
                            <Button
                                glyph={<FaTimes />}
                                action={bind(this.change, null, null)}
                            />
                        </Container>
                    )
                } else {
                    return (
                        <Container>
                            <LeftWrapper>
                                <Input
                                    type="text"
                                    value={this.state.alias}
                                    onChange={this.handle}
                                    placeholder="your username"
                                />
                            </LeftWrapper>
                            <Button glyph={<FaRedo />} action={this.realias} />
                            <Button glyph={<FaCheck />} action={this.submit} />
                            <Button
                                glyph={<FaTimes />}
                                action={bind(this.change, null, null)}
                            />
                        </Container>
                    )
                }

            default:
                return null
        }
    }

    render() {
        return (
            <Container>
                <Copyright />
                <BorderWrapper>
                    <Button
                        glyph={<FaFacebookFStyled />}
                        action={bind(this.change, null, 'facebook')}
                        hint="login via facebook"
                        hbig={true}
                    />
                    <Button
                        glyph={<FaTwitterStyled />}
                        action={bind(this.change, null, 'twitter')}
                        hint="login via twitter"
                        hbig={true}
                    />
                    <Button
                        glyph={<FaUserStyled />}
                        action={bind(this.change, null, 'username')}
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
