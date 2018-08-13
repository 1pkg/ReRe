import { bind, map } from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, History } from '~/helpers'
import { Effect as Subject } from './../subject'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    margin: ${props => props.theme['normal-unit']};
`

const SubContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    border:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['half-main-color']};
    box-shadow:
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['quarter-main-color']};
    overflow-y: scroll;
`

const Title = Styled.div`
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
`

const Snippet = Styled.div`
    flex: 0 0 75%;
    display: flex;
    overflow: hidden;
    border-radius: ${props => props.theme['half-small-unit']};
    margin: ${props => props.theme['half-small-unit']};
    &:hover {
        cursor: pointer;
    };
`

export default class extends React.Component {
    fetch = async label => {
        Analytic.event(Analytic.EVENT_CLICK, { label })
        let state = await this.props.trigger.call(Trigger.ACTION_FETCH, label)
        History.push(state.task.label)
    }

    snippets() {
        return map(this.props.list, (task, index) => {
            return (
                <Snippet
                    key={index}
                    onClick={bind(this.fetch, null, task.label)}
                >
                    <Subject
                        subject={task.subject}
                        effects={task.effects}
                        shaders={this.props.shaders}
                    />
                </Snippet>
            )
        })
    }

    render() {
        if (this.props.active) {
            return (
                <MainContainer>
                    <Title>{this.props.title}</Title>
                    <SubContainer>{this.snippets()}</SubContainer>
                </MainContainer>
            )
        }
        return <MainContainer />
    }
}
