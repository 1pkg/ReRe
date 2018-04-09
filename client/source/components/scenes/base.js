import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Toggle from './../blocks/toolbar/toggle'

let MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

let SubjectContainer = styled.div`
    flex: 3 1 0;
    display: flex;
`

let FullOptionContainer = styled.div`
    flex: 1 1 0;
    display: flex;
`

let NoneOptionContainer = styled.div`
    display: none;
`

let ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    constructor(props) {
        super(props)
        this.state = { full: true }
    }

    toggle = () => {
        this.setState(state => {
            setTimeout(() => this.forceUpdate())
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: !state.full }
        })
    }

    render() {
        let OptionContainer = this.state.full
            ? FullOptionContainer
            : NoneOptionContainer
        return (
            <MainContainer>
                <SubjectContainer>{this.props.subject}</SubjectContainer>
                <ToolbarContainer>
                    <Toggle full={this.state.full} toggle={this.toggle} />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>{this.props.options}</OptionContainer>
            </MainContainer>
        )
    }
}
