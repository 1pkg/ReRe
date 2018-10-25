import React from 'react'
import { findDOMNode } from 'react-dom'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Apply, Close } from './../button'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    z-index: 1;
    position: fixed;
    left: ${props => props.theme[tc.zu]};
    top: ${props => props.theme[tc.zu]};
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
    margin:
        ${props => (props.mobile ? props.theme[tc.hsu] : props.theme[tc.maxu])};
    background-color: ${props => props.theme[tc.subc]};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
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

export default class extends React.Component {
    close = event => {
        let element = findDOMNode(this)
        if (event.target === element) {
            this.props.close()
        }
    }

    buttons() {
        if ('apply' in this.props) {
            return (
                <ButtonContainer>
                    <Close action={this.props.close} />
                    <Apply action={this.props.apply} />
                </ButtonContainer>
            )
        } else {
            return (
                <ButtonContainer>
                    <Close action={this.props.close} />
                </ButtonContainer>
            )
        }
    }

    render() {
        return (
            <MainContainer active={this.props.active} onClick={this.close}>
                <SubContainer mobile={Device.mobile()}>
                    <TitleContainer>
                        <Title>{this.props.title}</Title>
                        {this.buttons()}
                    </TitleContainer>
                    <Content>{this.props.content}</Content>
                </SubContainer>
            </MainContainer>
        )
    }
}
