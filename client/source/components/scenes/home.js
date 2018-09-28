import React from 'react'
import Styled from 'styled-components'

import { Analytic, Device } from '~/helpers'
import { Main as Toolbar } from './../blocks/toolbar'
import { Carousel, Tape, Userbar } from './../blocks/other'
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
        this.setState(prev => {
            let lists = this.props.state.lists
            let daily = lists.daily && lists.daily.length >= MINIMAL_TAPE_LENGTH
            let weekly =
                lists.weekly && lists.weekly.length >= MINIMAL_TAPE_LENGTH
            let monthly =
                lists.monthly && lists.monthly.length >= MINIMAL_TAPE_LENGTH

            let next = Object.assign({}, prev)
            if (daily) {
                next['daily'] = true
            }
            if (weekly) {
                next['weekly'] = !daily
            }
            if (monthly) {
                next['monthly'] = !daily && !weekly
            }
            return next
        })
    }

    activate = index => {
        this.setState(prev => {
            let indx = 0
            let next = Object.assign({}, prev)
            for (let period in next) {
                next[period] = index === indx++
            }
            Analytic.event(Analytic.EVENT_SWIPE, { index })
        })
    }

    tape(period, title) {
        let lists = this.props.state.lists
        if (
            period in lists &&
            lists[period] &&
            lists[period].length >= MINIMAL_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={title}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    blobs={this.props.state.blobs}
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
                <Userbar
                    trigger={this.props.trigger}
                    alias={this.props.state.alias}
                    stats={this.props.state.stats}
                />
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
                        notifications={this.props.state.notifications}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    desktop() {
        return (
            <MainContainer>
                <Userbar
                    trigger={this.props.trigger}
                    alias={this.props.state.alias}
                    stats={this.props.state.stats}
                />
                <SubContainer>
                    {this.tape('daily', 'Daily Popular')}
                    {this.tape('weekly', 'Weekly Popular')}
                    {this.tape('monthly', 'Monthly Popular')}
                </SubContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        notifications={this.props.state.notifications}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
