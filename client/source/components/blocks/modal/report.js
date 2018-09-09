import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaFlag } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
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
    min-height: ${props => props.theme[tc.oahpbu]};
    font-size: ${props => props.theme[tc.normalu]};
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

    report = async event => {
        let node = findDOMNode(this)
        let textarea = node.querySelector('textarea')
        if (textarea.value.trim()) {
            this.props.trigger.call(Trigger.ACTION_REPORT, textarea.value)
            this.props.trigger.call(Trigger.ACTION_MARK, 'report')
            this.hide()
        } else {
            this.setState(state => {
                return { ...state, error: true }
            })
        }
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
                        defaultValue={`I want report task\n#l${
                            this.props.label
                        }\nfor next reason:\n`}
                    />
                </Form>
            )
        }
    }

    render() {
        return (
            <Container>
                <Simple glyph={FaFlag} hint={'report'} action={this.show} />
                <Modal
                    title={'Report'}
                    content={this.content()}
                    active={+this.state.active}
                    apply={this.report}
                    close={this.hide}
                />
            </Container>
        )
    }
}
