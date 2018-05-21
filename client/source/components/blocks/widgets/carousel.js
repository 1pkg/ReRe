import Lodash from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    max-height: 100vh;
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

const tqmc = 'three-quarters-main-color'
const fmc = 'fourth-main-color'
const DotElement = Styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.2rem;
    background-color:
        ${props => (props.active ? props.theme[tqmc] : props.theme[fmc])};
`

export default class extends React.Component {
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

    componentDidMount() {
        let size = Lodash.filter(this.props.children, child => child).length - 1
        let index = this.props.active ? this.props.active - 1 : 0
        this.setState(state => {
            return { size, index }
        })
    }

    render() {
        if (this.state) {
            return (
                <MainContainer>
                    <SwipeableContainer
                        onSwipedRight={this.previous}
                        onSwipedLeft={this.next}
                    >
                        {Lodash.map(
                            Lodash.filter(this.props.children, child => child),
                            (child, index) => {
                                return (
                                    <SwipeableWrapper
                                        key={index}
                                        order={Number(
                                            index !== this.state.index,
                                        )}
                                    >
                                        {child}
                                    </SwipeableWrapper>
                                )
                            },
                        )}
                    </SwipeableContainer>
                    <DotContainer>
                        {Lodash.map(
                            Lodash.filter(this.props.children, child => child),
                            (child, index) => {
                                return (
                                    <DotElement
                                        key={index}
                                        active={index === this.state.index}
                                    />
                                )
                            },
                        )}
                    </DotContainer>
                </MainContainer>
            )
        }
        return null
    }
}
