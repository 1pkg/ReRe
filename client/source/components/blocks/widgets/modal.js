import React from 'react'
import ReactDOM from 'react-dom'
import Cross from 'react-icons/lib/fa/close'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import Button from './button'

const Container = Styled.div`
    z-index: 1;
    position: fixed;
    left: 0rem;
    top: 0rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.9);
`

const ActiveContainer = Container.extend`
    display: block;
`

const DisabledContainer = Container.extend`
    display: none;
`

const InnerContainer = Styled.div`
    padding: 2.5rem;
    background-color: white;
`

const DesktopInnerContainer = InnerContainer.extend`
    margin: 5rem 5rem 0rem 5rem;
`

const MobileInnerContainer = InnerContainer.extend``

const TitleContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`
const Title = Styled.div`
    flex: 1 0 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`

const Content = Styled.div`
    font-size: 1rem;
    text-align: justify;
    white-space: pre-wrap;
`

class Close extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.hotkey, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.hotkey, false)
    }

    hotkey = event => {
        if (event.keyCode === 27) {
            this.props.action()
        }
    }

    render() {
        return <Button glyph={<Cross />} action={this.props.action} />
    }
}

export default class extends React.Component {
    hide = event => {
        let element = ReactDOM.findDOMNode(this)
        if (event.target === element) {
            this.props.hide()
        }
    }

    render() {
        const Container = this.props.active
            ? ActiveContainer
            : DisabledContainer
        const InnerContainer = Device.mobile()
            ? MobileInnerContainer
            : DesktopInnerContainer
        return (
            <Container onClick={this.hide}>
                <InnerContainer>
                    <TitleContainer>
                        <Title>{this.props.title}</Title>
                        <Close action={this.props.hide} />
                    </TitleContainer>
                    <Content>{this.props.content}</Content>
                </InnerContainer>
            </Container>
        )
    }
}
