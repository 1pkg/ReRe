import React from 'react'
import ExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle'
import styled from 'styled-components'

import Button from './button'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Text = styled.div`
    font-size: 0.5rem;
    font-style: italic;
    text-transform: lowercase;
`

export default class extends React.Component {
    glyph() {
        return (
            <Container>
                <ExclamationTriangle />
                <Text>Disclaimer</Text>
            </Container>
        )
    }

    render() {
        return (
            <Button
                glyph={this.glyph()}
                action={this.props.show}
                mobile={this.props.mobile}
                small
            />
        )
    }
}
