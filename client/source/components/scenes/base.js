import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, Device } from '~/helpers'
import { Carousel, Stat } from './../blocks/widgets'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SubjectContainer = Styled.div`
    flex: 3 1 0;
    max-height: ${props => (props.full ? '100vh' : '70vh')};
    display: flex;
`

const SwipeableSubjectContainer = Styled(Swipeable)`
    flex: 3 1 0;
    max-height: ${props => (props.full ? '100vh' : '70vh')};
    display: flex;
`

const OptionContainer = Styled.div`
    max-height: 25vh;
    display: ${props => (props.hidden ? 'none' : 'flex')};
    flex: 1 1 0;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => '-' + props.theme[tc.smallu]};
    margin-bottom: ${props => props.theme[tc.hsu]};
`

const StatContainer = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-75%);
`

export default class self extends React.Component {
    static full = false

    fetch = async () => {
        Analytic.event(Analytic.EVENT_SWIPE, { direction: 'fetch' })
        this.props.trigger.call(Trigger.ACTION_FETCH)
    }

    expand = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            self.full = true
            Analytic.event(Analytic.EVENT_SWIPE, { direction: 'expand' })
            return { full: self.full }
        })
    }

    colapse = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            self.full = false
            Analytic.event(Analytic.EVENT_SWIPE, { direction: 'colapse' })
            return { full: self.full }
        })
    }

    toggle = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            self.full = !state.full
            return { full: self.full }
        })
    }

    constructor(props) {
        super(props)
        this.state = { full: self.full }
    }

    mobile() {
        const Toolbar = this.props.toolbar
        return (
            <MainContainer>
                <SwipeableSubjectContainer
                    full={+this.state.full}
                    onSwipedLeft={this.fetch}
                    onSwipedDown={this.expand}
                    onSwipedUp={this.colapse}
                >
                    {this.props.subject}
                </SwipeableSubjectContainer>
                <StatContainer>
                    <Stat
                        stat={this.props.state.stat}
                        task={this.props.state.task}
                    />
                </StatContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        label={this.props.state.task.label}
                        handled={this.props.state.task.handled}
                        timestamp={this.props.state.timestamp}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                </ToolbarContainer>
                <OptionContainer hidden={this.state.full}>
                    <Carousel
                        active={this.props.state.option}
                        label={this.props.state.task.label}
                    >
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
            </MainContainer>
        )
    }

    desktop() {
        const Toolbar = this.props.toolbar
        return (
            <MainContainer>
                <SubjectContainer full={this.state.full}>
                    {this.props.subject}
                </SubjectContainer>
                <StatContainer>
                    <Stat
                        stat={this.props.state.stat}
                        task={this.props.state.task}
                    />
                </StatContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        label={this.props.state.task.label}
                        handled={this.props.state.task.handled}
                        timestamp={this.props.state.timestamp}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                </ToolbarContainer>
                <OptionContainer hidden={this.state.full}>
                    {this.props.options}
                </OptionContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
