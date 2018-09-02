import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, Device, History } from '~/helpers'
import { Cut as Toolbar } from './../blocks/toolbar'
import { Carousel, Copyright, Tape } from './../blocks/widgets'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SubContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-between;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme[tc.hsu]};
    margin-bottom: ${props => props.theme[tc.hsu]};
`

export default class self extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        History.push(Trigger.STATUS_LAND)
        this.setState(prev => {
            let lists = this.props.state.lists
            let d = lists.daily.length >= MINIMAL_LANDING_TAPE_LENGTH
            let w = lists.weekly.length >= MINIMAL_LANDING_TAPE_LENGTH
            let m = lists.monthly.length >= MINIMAL_LANDING_TAPE_LENGTH
            let next = {}
            if (d) {
                next['daily'] = true
            }
            if (w) {
                next['weekly'] = !d
            }
            if (m) {
                next['monthly'] = !d && !m
            }
            return next
        })
    }

    activate = index => {
        this.setState(prev => {
            let indx = 0
            let next = Object.assign({}, prev)
            for (let period in next) {
                next[period] = index == indx++
            }
            Analytic.event(Analytic.EVENT_SWIPE, { index })
        })
    }

    tape(period, title) {
        let lists = this.props.state.lists
        if (lists[period].length >= MINIMAL_LANDING_TAPE_LENGTH) {
            return (
                <Tape
                    title={title}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={lists[period]}
                    active={!Device.mobile() || this.state[period]}
                />
            )
        }
        return null
    }

    mobile() {
        return (
            <MainContainer>
                <Copyright />
                <SubContainer>
                    <Carousel activate={this.activate}>
                        {this.tape('daily', 'Daily Popular')}
                        {this.tape('weekly', 'Weekly Popular')}
                        {this.tape('monthly', 'Monthly Popular')}
                    </Carousel>
                </SubContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    desktop() {
        return (
            <MainContainer>
                <Copyright />
                <SubContainer>
                    {this.tape('daily', 'Daily Popular')}
                    {this.tape('weekly', 'Weekly Popular')}
                    {this.tape('monthly', 'Monthly Popular')}
                </SubContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
