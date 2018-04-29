import Lodash from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SwipeableContainer = styled(Swipeable)`
    flex: 1 1 0;
    display: flex;
    overflow: hidden;
`

const SwipeableWrapper = styled.div`
    flex: 1 0 100%;
    order: ${props => props.order};
    display: flex;
`

const DotContainer = styled.div`
    align-self: center;
    display: flex;
`

const BaseDot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.2rem;
    background-color: black;
`

const ActiveDot = BaseDot.extend`
    opacity: 0.8;
`

const DisabledDot = BaseDot.extend`
    opacity: 0.4;
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
                        if (index === this.state.index) {
                            return <ActiveDot key={index} />
                        } else {
                            return <DisabledDot key={index} />
                        }
                    })}
                </DotContainer>
            </Container>
        )
    }
}
