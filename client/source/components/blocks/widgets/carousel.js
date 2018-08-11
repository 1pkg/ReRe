import { filter, map } from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'
import AngelRight from 'react-icons/lib/fa/angle-right'
import AngelLeft from 'react-icons/lib/fa/angle-left'

import { Analytic } from '~/helpers'

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
    align-items: center;
`

const HintWrapper = Styled.div`
    font-size: ${props => props.theme['small-unit']};
`

const tqmc = 'three-quarters-main-color'
const qmc = 'quarter-main-color'
const DotElement = Styled.div`
    width: ${props => props.theme['half-small-unit']};
    height: ${props => props.theme['half-small-unit']};
    border-radius: ${props => props.theme['half-small-unit']};
    background-color:
        ${props => (props.active ? props.theme[tqmc] : props.theme[qmc])};
    margin: ${props => props.theme['half-small-unit']};
`
export default class self extends React.Component {
    static size = 0
    static index = 0
    static label = null

    next = () => {
        if (this.state.index >= self.size) {
            return
        }

        this.setState(state => {
            self.index = this.state.index + 1
            this.props.activate ? this.props.activate(self.index) : void 0
            Analytic.event(Analytic.EVENT_SWIPE, { direction: 'next' })
            return { index: self.index }
        })
    }

    previous = () => {
        if (this.state.index <= 0) {
            return
        }

        this.setState(state => {
            self.index = this.state.index - 1
            this.props.activate ? this.props.activate(self.index) : void 0
            Analytic.event(Analytic.EVENT_SWIPE, { direction: 'previous' })
            return { index: self.index }
        })
    }

    componentDidMount() {
        self.index = this.props.label == self.label ? self.index : 0
        self.label = this.props.label
        self.size = filter(this.props.children, child => child).length - 1
        this.setState(state => {
            let index = this.props.active ? this.props.active - 1 : self.index
            return { index }
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
                        {map(
                            filter(this.props.children, child => child),
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
                        <HintWrapper>
                            <AngelLeft onClick={this.previous} />
                        </HintWrapper>
                        {map(
                            filter(this.props.children, child => child),
                            (child, index) => {
                                return (
                                    <DotElement
                                        key={index}
                                        active={index === this.state.index}
                                    />
                                )
                            },
                        )}
                        <HintWrapper>
                            <AngelRight onClick={this.next} />
                        </HintWrapper>
                    </DotContainer>
                </MainContainer>
            )
        }
        return null
    }
}
