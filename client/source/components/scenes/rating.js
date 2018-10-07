import React from 'react'
import Styled from 'styled-components'

import { Rating as Builder } from '~/helpers'
import { Main as Toolbar } from './../blocks/toolbar'
import { Rating, Userbar } from './../blocks/other'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const RatingContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    overflow-y: auto;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme[tc.hsu]};
    margin-bottom: ${props => props.theme[tc.hsu]};
`

const TextContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const SubContainer = Styled.div``

const MainText = Styled.div`
    font-size: ${props => props.theme[tc.sbu]};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`

const MinorText = Styled.div`
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class self extends React.Component {
    empty() {
        return (
            <TextContainer>
                <SubContainer>
                    <MainText>rating</MainText>
                    <MainText>currently</MainText>
                    <MainText>isn't available</MainText>
                </SubContainer>
                <SubContainer>
                    <MinorText>we are working on</MinorText>
                    <MinorText>data collecting and processing</MinorText>
                    <MinorText>please wait a while</MinorText>
                </SubContainer>
            </TextContainer>
        )
    }

    content() {
        let table = Builder.build(
            this.props.state.alias,
            this.props.state.stats.score,
            this.props.state.table,
        )
        if (table && table.rating.length >= MINIMAL_TABLE_LENGTH) {
            return (
                <RatingContainer>
                    <Rating table={table} />
                </RatingContainer>
            )
        }
        return this.empty()
    }

    render() {
        return (
            <MainContainer>
                <Userbar
                    trigger={this.props.trigger}
                    alias={this.props.state.alias}
                    stats={this.props.state.stats}
                />
                {this.content()}
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        notifications={this.props.state.notifications}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }
}
