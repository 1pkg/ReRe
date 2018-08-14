import { findIndex, head, last, map, sortBy } from 'lodash'
import React from 'react'
import Styled from 'styled-components'

const Table = Styled.table`
    flex: 1 1 0;
    text-align: center;
    border-collapse: collapse;
    border-style: hidden;
`

const Header = Styled.thead``

const Body = Styled.thead``

const Row = Styled.tr`
    font-style: italic;
    text-transform: capitalize;
    color: ${props => (props.current ? props.theme['active-color'] : 'auto')};
    &:hover {
        color: ${props => props.theme['active-color']};
        cursor: pointer;
    };
`

const Column = Styled.td`
    border-right:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['active-color']};
    border-left:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['active-color']};
`

const HeaderColumn = Styled.th`
    border:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['active-color']};
`

const TextContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const MainText = Styled.div`
    font-size: ${props => props.theme['sub-big-unit']};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`

const MinorText = Styled.div`
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    build(rating, total) {
        rating = sortBy(rating, ['score']).reverse()
        rating = map(rating, (row, index) => {
            return {
                index: index + 1,
                name: row.alias,
                score: row.score,
            }
        })

        let index = findIndex(rating, row => {
            return row.name == this.props.alias && row.score == this.props.score
        })
        if (index !== -1) {
            rating[index] = {
                index,
                name: `THIS IS YOU - ${this.props.alias}`,
                score: this.props.score,
            }
            if (total > rating.length) {
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: total, name: '...', score: '...' })
            }
        } else {
            let koef = (head(rating).score - last(rating).score) / rating.length
            let diff = head(rating).score - this.props.score
            index = Math.floor(diff / koef)
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({
                index,
                name: `THIS IS YOU - ${this.props.alias}`,
                score: this.props.score,
            })
            if (total > index) {
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: total, name: '...', score: '...' })
            }
        }
        return { rating, index }
    }

    body(rating) {
        return map(rating.rating, (row, index) => {
            return (
                <Row key={index} current={rating.index == row.index}>
                    <Column>{row.index}</Column>
                    <Column>{row.name}</Column>
                    <Column>{row.score}</Column>
                </Row>
            )
        })
    }

    render() {
        let rating = this.build(this.props.rating, this.props.rating.total)
        if (rating.length >= MINIMAL_RATING_TABLE_LENGTH) {
            return (
                <Table>
                    <Header>
                        <Row>
                            <HeaderColumn>#</HeaderColumn>
                            <HeaderColumn>Name</HeaderColumn>
                            <HeaderColumn>Score</HeaderColumn>
                        </Row>
                    </Header>
                    <Body>{this.body(rating)}</Body>
                </Table>
            )
        }
        return (
            <TextContainer>
                <MinorText>rating currently isn't available</MinorText>
                <MinorText>
                    we are working on data collecting and processing
                </MinorText>
                <MinorText>please wait a while ...</MinorText>
            </TextContainer>
        )
    }
}
