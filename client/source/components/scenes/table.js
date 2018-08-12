import React from 'react'
import Styled from 'styled-components'

import { Cut as Toolbar } from './../blocks/toolbar'
import { Rating } from './../blocks/widgets'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const RatingContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    overflow-y: auto;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme['half-small-unit']};
    margin-bottom: ${props => props.theme['half-small-unit']};
`

export default class self extends React.Component {
    render() {
        return (
            <MainContainer>
                <RatingContainer>
                    <Rating
                        alias={this.props.state.alias}
                        score={this.props.state.stat.score}
                        rating={this.props.state.table}
                    />
                </RatingContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }
}
