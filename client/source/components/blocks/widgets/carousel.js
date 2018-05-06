import Lodash from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SwipeableContainer = Styled(Swipeable)`
    flex: 1 1 0;
    display: flex;
    overflow: hidden;
`

const SwipeableWrapper = Styled.div`
    flex: 1 0 100%;
    order: ${props => props.order};
    display: flex;
`

const DotContainer = Styled.div`
    align-self: center;
    display: flex;
`

const Dot = Styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.2rem;
    background-color: black;
    opacity: ${props => (props.active ? '0.8' : '0.4')};
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    componentDidMount() {
        let size = this.props.children.length - 1
        let index = this.props.option ? this.props.option - 1 : 0
        this.setState(state => {
            return { size, index }
        })
    }

    next = () => {
        if (this.state.index >= this.state.size) {
            return
        }

        this.setState(state => {
            return {
                size: this.state.size,
                index: this.state.index + 1,
            }
        })
    }

    previous = () => {
        if (this.state.index <= 0) {
            return
        }

        this.setState(state => {
            return {
                size: this.state.size,
                index: this.state.index - 1,
            }
        })
    }

    render() {
        if (!this.state) return null

        return (
            <Container>
                <SwipeableContainer
                    onSwipedRight={this.previous}
                    onSwipedLeft={this.next}
                >
                    {Lodash.map(this.props.children, (child, index) => {
                        let order = index === this.state.index ? 0 : 1
                        return (
                            <SwipeableWrapper key={index} order={order}>
                                {child}
                            </SwipeableWrapper>
                        )
                    })}
                </SwipeableContainer>
                <DotContainer>
                    {Lodash.map(this.props.children, (child, index) => {
                        return (
                            <Dot
                                key={index}
                                active={index === this.state.index}
                            />
                        )
                    })}
                </DotContainer>
            </Container>
        )
    }
}
