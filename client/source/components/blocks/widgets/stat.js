import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import Badge from './badge'
import { tc } from '~/theme'

const Container = Styled.div`
    flex: ${props => (props.mobile ? '0 0 50%' : '0 0 25%')};
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: ${props => props.theme[tc.snu]};
    background-color: ${props => props.theme[tc.subc]};
    border-radius: ${props => props.theme[tc.hsu]};
    border-top:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    render() {
        let complexity = this.props.task.complexity
            ? `${this.props.task.complexity}%`
            : 'new task'
        let factor = `x${this.props.stat.factor}`
        return (
            <Container mobile={Device.mobile()}>
                <Badge text={complexity} hint="complexity" />
                <Badge text={factor} hint="factor" />
                <Badge text={this.props.stat.freebie} hint="freebie" />
                <Badge text={this.props.stat.score} hint="score" />
            </Container>
        )
    }
}
