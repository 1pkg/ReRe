import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Close from './close'

const Container = styled.div`
    z-index: 1;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.9);
`

const ActiveContainer = Container.extend`
    display: block;
`

const DisabledContainer = Container.extend`
    display: none;
`

const InnerContainer = styled.div`
    padding: 2.5rem;
    background-color: white;
`

const DesktopInnerContainer = InnerContainer.extend`
    margin: 5rem;
`

const MobileInnerContainer = InnerContainer.extend``

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`
const Title = styled.div`
    flex: 1 0 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`

const Text = styled.div`
    font-size: 1rem;
    text-align: justify;
    white-space: pre-wrap;
`

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
        const InnerContainer = this.props.mobile
            ? MobileInnerContainer
            : DesktopInnerContainer
        return (
            <Container onClick={this.hide}>
                <InnerContainer>
                    <TitleContainer>
                        <Title>{this.props.title}</Title>
                        <Close
                            action={this.props.hide}
                            mobile={this.props.mobile}
                        />
                    </TitleContainer>
                    <Text>{this.props.message}</Text>
                </InnerContainer>
            </Container>
        )
    }
}
