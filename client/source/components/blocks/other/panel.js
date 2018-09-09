import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Badge } from './../button'
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

const Divider = Styled.div`
    height: ${props => props.theme[tc.normalu]};
    width: ${props => props.theme[tc.msu]}; 
    background-color: ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    render() {
        return (
            <Container mobile={Device.mobile()}>
                <Badge
                    text={`${this.props.task.simplicity}%`}
                    hint="simplicity"
                />
                <Badge
                    text={`${this.props.task.popularity}★`}
                    hint="popularity"
                />
                <Divider />
                <Badge text={`${this.props.stats.factor}x`} hint="factor" />
                <Badge text={this.props.stats.freebie} hint="freebie" />
                <Badge text={this.props.stats.score} hint="score" />
            </Container>
        )
    }
}
