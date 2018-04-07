import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Trigger from '~/actions/trigger'
import Subject from './../blocks/subject/effect'
import Choose from './../blocks/options/choose'

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
                            return (
                                <OptionWrapper key={index}>
                                    <Choose
                                        trigger={this.props.trigger}
                                        index={index}
                                        option={option}
                                    />
                                </OptionWrapper>
                            )
                        },
                    )}
                </OptionContainer>
            </MainContainer>
        )
    }
}
