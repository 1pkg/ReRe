import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import Button from './button'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    z-index: 1;
    position: fixed;
    left: 0rem;
    top: 0rem;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme[tc.tqmc]};
    display: ${props => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
`

const SubContainer = Styled.div`
    flex: ${props => (props.mobile ? '1 1 0' : '0 0 auto')};
    padding: ${props => props.theme[tc.smallu]};
    margin: ${props => (props.mobile ? '0rem' : props.theme[tc.maxu])};
    background-color: ${props => props.theme[tc.subc]};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow-y: auto;
`

const TitleContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = Styled.div`
    flex: 1 1 0;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`

const Content = Styled.div`
    display: flex;
    padding: ${props => props.theme[tc.snu]};
`

const ButtonContainer = Styled.div`
    display: flex;
    flex-direction: column;
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
        return <Button glyph={<FaTimes />} action={this.props.action} />
    }
}

export default class extends React.Component {
    hide = event => {
        let element = findDOMNode(this)
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
                        <ButtonContainer>
                            <Close action={this.props.hide} />
                            {this.props.buttons}
                        </ButtonContainer>
                    </TitleContainer>
                    <Content>{this.props.content}</Content>
                </SubContainer>
            </MainContainer>
        )
    }
}
