import React from 'react'
import ReactDOM from 'react-dom'
import Cross from 'react-icons/lib/fa/close'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import Button from './button'

const MainContainer = Styled.div`
    z-index: 1;
    position: fixed;
    left: 0rem;
    top: 0rem;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.threeQuartersMainColor};
    display: ${props => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
`

const SubContainer = Styled.div`
    flex: ${props => (props.mobile ? '1 1 0' : '0 0 auto')};
    padding: 2.5rem;
    margin: ${props => (props.mobile ? '0rem' : 'auto')};
    background-color: ${props => props.theme.subColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
`

const TitleContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`

const Title = Styled.div`
    flex: 1 1 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`

const Content = Styled.div`
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
        if (event.target === element) {
            this.props.hide()
        }
    }

    render() {
        return (
            <MainContainer active={this.props.active} onClick={this.hide}>
                <SubContainer mobile={Device.mobile()}>
                    <TitleContainer>
                        <Title>{this.props.title}</Title>
                        <Close action={this.props.hide} />
                    </TitleContainer>
                    <Content mobile={Device.mobile()}>
                        {this.props.content}
                    </Content>
                </SubContainer>
            </MainContainer>
        )
    }
}
