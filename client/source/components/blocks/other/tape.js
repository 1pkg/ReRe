import { bind, map } from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic } from '~/helpers'
import { Effect as Subject } from './../subject'
import { Flexscroll } from './'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    margin: ${props => props.theme[tc.normalu]};
`

const SubContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.hmc]};
    box-shadow:
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.qmc]};
    overflow: hidden;
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
    border-radius: ${props => props.theme[tc.hsu]};
    margin: ${props => props.theme[tc.hsu]};
    &:hover {
        cursor: pointer;
    };
`

export default class extends React.Component {
    fetch = async label => {
        Analytic.event(Analytic.EVENT_CLICK, { label })
        this.props.trigger.call(Trigger.ACTION_FETCH, label)
    }

    snippets() {
        return map(this.props.list, (task, index) => {
            return (
                <Snippet
                    key={index}
                    onClick={bind(this.fetch, null, task.label)}
                >
                    <Subject
                        trigger={this.props.trigger}
                        subject={task.subject}
                        effects={task.effects}
                        shaders={this.props.shaders}
                        blobs={this.props.blobs}
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
                    <SubContainer>
                        <Flexscroll>{this.snippets()}</Flexscroll>
                    </SubContainer>
                </MainContainer>
            )
        }
        return <MainContainer />
    }
}
