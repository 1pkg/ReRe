import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Trigger from '~/actions/trigger'
import Subject from './../blocks/subject/plain'
import Correct from './../blocks/options/correct'
import Wrong from './../blocks/options/wrong'

let MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

let SubjectContainer = styled.div`
    flex: 3 1 0;
    display: flex;
`

let OptionContainer = styled.div`
    flex: 1 1 0;
    display: flex;
`

let OptionWrapper = styled.div`
    flex: 1 1 0;
    margin: 0.5rem;
`

export default class extends React.Component {
    render() {
        return (
            <MainContainer>
                <SubjectContainer>
                    <Subject
                        trigger={this.props.trigger}
                        subject={this.props.state.task.subject}
                        effects={this.props.state.task.effects}
                    />
                </SubjectContainer>
                <OptionContainer>
                    {Lodash.map(
                        this.props.state.task.options,
                        (option, index) => {
                            let Option =
                                option.name === this.props.state.option
                                    ? Correct
                                    : Wrong
                            return (
                                <OptionWrapper key={index}>
                                    <Option option={option} />
                                </OptionWrapper>
                            )
                        },
                    )}
                </OptionContainer>
            </MainContainer>
        )
    }
}
