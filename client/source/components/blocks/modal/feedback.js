import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaStar } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, Rating } from '~/helpers'
import Modal from './base'
import { Simple } from './../button'
import { tc } from '~/theme'

const Container = Styled.div``

const Form = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Textarea = Styled.textarea`
    resize: none;
    min-width: 75%;
    font-size: ${props => props.theme[tc.normalu]};
    min-height: ${props => props.theme[tc.oahpbu]};
`

const ErrorTextarea = Styled(Textarea)`
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
    show = () => {
        this.setState(state => {
            return { ...state, active: true }
        })
    }

    hide = () => {
        this.setState(state => {
            return { ...state, active: false }
        })
    }

    feedback = async () => {
        let node = findDOMNode(this)
        let textarea = node.querySelector('textarea')
        if (textarea.value.trim()) {
            this.props.trigger.call(Trigger.ACTION_FEEDBACK, textarea.value)
            this.hide()
        } else {
            Analytic.event(Analytic.EVENT_EMPTY, { type: 'feedback' })
            this.setState(state => {
                return { ...state, error: true }
            })
        }
    }

    share = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'market')
    }

    rate = () => {
        Rating.rate(this.share, this.show)
    }

    constructor(props) {
        super(props)
        this.state = { active: false, error: false }
    }

    content() {
        if (this.state.error) {
            return (
                <Form>
                    <ErrorTextarea />
                    <ErrorMinorText>please type something</ErrorMinorText>
                </Form>
            )
        } else {
            return (
                <Form>
                    <Textarea
                        defaultValue={
                            'I want leave feedback for next reason:\n'
                        }
                    />
                </Form>
            )
        }
    }

    render() {
        return (
            <Container>
                <Simple glyph={FaStar} hint={'rate'} action={this.rate} />
                <Modal
                    title={'Feedback'}
                    content={this.content()}
                    active={+this.state.active}
                    apply={this.feedback}
                    close={this.hide}
                />
            </Container>
        )
    }
}
