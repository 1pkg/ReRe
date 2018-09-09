import { map } from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { tc } from '~/theme'

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
    color: ${props => (props.current ? props.theme[tc.activec] : 'auto')};
    &:hover {
        color: ${props => props.theme[tc.activec]};
        cursor: pointer;
    };
`

const Column = Styled.td`
    border-right:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.activec]};
    border-left:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.activec]};
`

const HeaderColumn = Styled.th`
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    body(table) {
        return map(table.rating, (row, index) => {
            return (
                <Row key={index} current={table.index === row.index}>
                    <Column>{row.index}</Column>
                    <Column>{row.name}</Column>
                    <Column>{row.score}</Column>
                </Row>
            )
        })
    }

    render() {
        return (
            <Table>
                <Header>
                    <Row>
                        <HeaderColumn>#</HeaderColumn>
                        <HeaderColumn>Name</HeaderColumn>
                        <HeaderColumn>Score</HeaderColumn>
                    </Row>
                </Header>
                <Body>{this.body(this.props.table)}</Body>
            </Table>
        )
    }
}
