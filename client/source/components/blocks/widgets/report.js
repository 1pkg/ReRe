import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaCheck, FaFlag } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import Button from './button'
import Modal from './modal'
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
            return { modal: true, error: state.error }
        })
    }

    hide = () => {
        this.setState(state => {
            return { modal: false, error: state.error }
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
                return { error: true, modal: state.modal }
            })
        }
    }

    constructor(props) {
        super(props)
        this.state = { modal: false, error: false }
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
                <Button glyph={<FaFlag />} action={this.show} hint={'report'} />
                <Modal
                    title={'Report'}
                    buttons={
                        <Button glyph={<FaCheck />} action={this.report} />
                    }
                    content={this.content()}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
