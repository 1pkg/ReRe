import { map } from 'lodash'
import React from 'react'
import { FaExclamation } from 'react-icons/fa'
import Styled from 'styled-components'

import Modal from './base'
import { Simple } from './../button'
import { tc } from '~/theme'

const Container = Styled.div``

const Wrapper = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Card = Styled.div`
    flex: 1 1 0;
    padding: ${props => props.theme[tc.hsu]};
    margin-bottom: ${props => props.theme[tc.hsu]};
    margin-right: ${props => props.theme[tc.hsu]};
    margin-left: ${props => props.theme[tc.hsu]};
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.hmc]};
    box-shadow:
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.qmc]};
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    text-align: center;
    white-space: pre-line;
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

    constructor(props) {
        super(props)
        this.state = { active: false }
    }

    notifications() {
        if (this.props.notifications && this.props.notifications.length) {
            return map(this.props.notifications, (notification, index) => {
                return (
                    <Card key={index} index={index + 1}>
                        <Text>{notification.trim()}</Text>
                    </Card>
                )
            })
        }
        return (
            <Card>
                <Text>currently nothing there</Text>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <Simple
                    glyph={FaExclamation}
                    hint={'notifs'}
                    action={this.show}
                />
                <Modal
                    title={'Notifications'}
                    content={<Wrapper>{this.notifications()}</Wrapper>}
                    active={+this.state.active}
                    close={this.hide}
                />
            </Container>
        )
    }
}
