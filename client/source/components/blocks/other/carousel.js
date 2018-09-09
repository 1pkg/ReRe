import { filter, map } from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import { Analytic } from '~/helpers'
import { Simple } from './../button'
import { tc } from '~/theme'

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
        if (this.state.index < self.size) {
            this.setState(state => {
                self.index = this.state.index + 1
                this.props.activate ? this.props.activate(self.index) : void 0
                Analytic.event(Analytic.EVENT_SWIPE, { direction: 'next' })
                return { ...state, index: self.index }
            })
        }
    }

    previous = () => {
        if (this.state.index > 0) {
            this.setState(state => {
                self.index = this.state.index - 1
                this.props.activate ? this.props.activate(self.index) : void 0
                Analytic.event(Analytic.EVENT_SWIPE, { direction: 'previous' })
                return { ...state, index: self.index }
            })
        }
    }

    constructor(props) {
        super(props)
        this.state = { index: 0 }
    }

    componentDidMount() {
        self.index = this.props.label === self.label ? self.index : 0
        self.label = this.props.label
        self.size = filter(this.props.children, child => child).length - 1
        this.setState(state => {
            let index = this.props.active ? this.props.active - 1 : self.index
            return { ...state, index }
        })
    }

    control(children) {
        if (children && children.length) {
            return (
                <DotContainer>
                    <Simple glyph={FaAngleLeft} action={this.previous} />
                    {map(children, (child, index) => {
                        return (
                            <DotElement
                                key={index}
                                active={index === this.state.index}
                            />
                        )
                    })}
                    <Simple glyph={FaAngleRight} action={this.next} />
                </DotContainer>
            )
        }
        return null
    }

    area(children) {
        if (children && children.length) {
            return (
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
            )
        }
        return null
    }

    render() {
        let children = filter(this.props.children, child => child)
        return (
            <MainContainer>
                {this.area(children)}
                {this.control(children)}
            </MainContainer>
        )
    }
}
