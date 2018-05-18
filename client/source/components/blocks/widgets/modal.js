import Lodash from 'lodash'
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
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: ${props => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
`

const InnerContainer = Styled.div`
    flex: ${props => (props.mobile ? '1 1 0' : 'auto')};
    padding: 2.5rem;
    margin: ${props => (props.mobile ? '0rem' : '2.5rem')};
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const TitleContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`

const Title = Styled.div`
    flex: 1 1 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`

const Content = Styled.div`
    flex: 1 1 0;
    font-size: 1rem;
    text-align: justify;
    white-space: pre-wrap;
    display: flex;
`

class Close extends React.Component {
    hotkey = event => {
        if (event.keyCode === 27) {
            this.props.action()
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.hotkey, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.hotkey, false)
    }

    render() {
        return <Button glyph={<Cross />} action={this.props.action} />
    }
}

export default class extends React.Component {
    hide = event => {
        let element = ReactDOM.findDOMNode(this)
        if (event.currentTarget === element) {
            this.props.hide()
        }
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Container active={this.props.active} onClick={this.hide}>
                <InnerContainer mobile={Device.mobile()}>
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
