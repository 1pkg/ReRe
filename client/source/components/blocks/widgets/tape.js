import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Effect as Subject } from './../subject'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    margin: 1rem;
`

const Wrapper = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    border: 0.01rem solid rgba(0, 0, 0, 0.5);
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
    overflow-y: scroll;
`

const Title = Styled.div`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
`

const Snippet = Styled.div`
    flex: 0 0 30%;
    display: flex;
    margin: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    &:hover {
        cursor: pointer;
    }
`

export default class extends React.Component {
    fetch = async label => {
        this.props.trigger.call(Trigger.ACTION_FETCH, label)
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
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
            <Container>
                <Title>{this.props.title}</Title>
                <Wrapper>{this.snippets()}</Wrapper>
            </Container>
        )
    }
}
