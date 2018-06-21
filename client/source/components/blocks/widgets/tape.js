import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
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
    font-size: ${props => props.theme['sub-big-unit']};
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
        this.props.trigger.call(Trigger.ACTION_FETCH, label)
    }

    snippets() {
        return Lodash.map(this.props.list, (task, index) => {
            return (
                <Snippet
                    key={index}
                    onClick={Lodash.bind(this.fetch, null, task.label)}
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
        return (
            <MainContainer>
                <Title>{this.props.title}</Title>
                <SubContainer>{this.snippets()}</SubContainer>
            </MainContainer>
        )
    }
}
