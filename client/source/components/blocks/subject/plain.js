import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

let Container = styled.div`
    flex: 1;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

let Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default class extends React.Component {
    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    link() {
        return 'images/' + this.props.subject.link
    }

    render() {
        return (
            <Container>
                <Image src={this.link()} />
            </Container>
        )
    }
}
