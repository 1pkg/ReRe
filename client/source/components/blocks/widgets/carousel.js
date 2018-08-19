import { filter, map } from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import { tc } from '~/theme'

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
    display: ${props => (props.empty ? 'none' : 'block')};
`

const FaAngleLeftStyled = Styled(FaAngleLeft)`
    width: ${props => props.theme[tc.smallu]};
    height: ${props => props.theme[tc.smallu]};
`

const FaAngleRightStyled = Styled(FaAngleRight)`
    width: ${props => props.theme[tc.smallu]};
    height: ${props => props.theme[tc.smallu]};
`

const DotElement = Styled.div`
    width: ${props => props.theme[tc.hsu]};
    height: ${props => props.theme[tc.hsu]};
    border-radius: ${props => props.theme[tc.hsu]};
    background-color:
        ${props => (props.active ? props.theme[tc.tqmc] : props.theme[tc.qmc])};
    margin: ${props => props.theme[tc.hsu]};
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
            let children = filter(this.props.children, child => child)
            return (
                <MainContainer>
                    <SwipeableContainer
                        onSwipedRight={this.previous}
                        onSwipedLeft={this.next}
                    >
                        {map(children, (child, index) => {
                            return (
                                <SwipeableWrapper
                                    key={index}
                                    order={Number(index !== this.state.index)}
                                >
                                    {child}
                                </SwipeableWrapper>
                            )
                        })}
                    </SwipeableContainer>
                    <DotContainer>
                        <HintWrapper empty={!children.length}>
                            <FaAngleLeftStyled onClick={this.previous} />
                        </HintWrapper>
                        {map(children, (child, index) => {
                            return (
                                <DotElement
                                    key={index}
                                    active={index === this.state.index}
                                />
                            )
                        })}
                        <HintWrapper empty={!children.length}>
                            <FaAngleRightStyled onClick={this.next} />
                        </HintWrapper>
                    </DotContainer>
                </MainContainer>
            )
        }
        return null
    }
}
