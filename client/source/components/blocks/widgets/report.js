import React from 'react'
import Flag from 'react-icons/lib/fa/flag-o'
import Check from 'react-icons/lib/fa/check'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Url, Device } from '~/helpers'
import Button from './button'
import Modal from './modal'

const Container = Styled.div``

const Form = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const pbu = 'penta-big-unit'
const Textarea = Styled.textarea`
    resize: none;
    min-width: ${props => props.theme[pbu]};
    min-height: ${props => props.theme[pbu]};
`

export default class extends React.Component {
    show = () => {
        this.setState(state => {
            return { modal: true }
        })
    }

    hide = () => {
        this.setState(state => {
            return { modal: false }
        })
    }

    report = async event => {
        let textarea = document.querySelector('textarea')
        this.props.trigger.call(Trigger.ACTION_REPORT, textarea.value)
        this.props.trigger.call(Trigger.ACTION_MARK, 'report')
        this.hide()
    }

    constructor(props) {
        super(props)
        this.state = { modal: false }
    }

    content() {
        let message = `I want report task\n#l${
            this.props.label
        }\nfor next reason:\n`
        return (
            <Form>
                <Textarea defaultValue={message} />
            </Form>
        )
    }

    render() {
        return (
            <Container>
                <Button glyph={<Flag />} action={this.show} hint={'report'} />
                <Modal
                    title={'Report'}
                    buttons={<Button glyph={<Check />} action={this.report} />}
                    content={this.content()}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
