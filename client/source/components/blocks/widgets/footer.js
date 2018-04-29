import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Disclaimer from './disclaimer'
import Modal from './modal'

const Container = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = { modal: false }
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    show = () => {
        this.setState(state => {
            return { modal: true }
        })
    }

    hide = () => {
        this.setState(state => {
            return { modal: false }
        })
    }

    render() {
        return (
            <Container>
                <Disclaimer show={this.show} mobile={this.props.mobile} />
                <Modal
                    title={'Disclaimer'}
                    message={this.props.settings['disclaimer-message']}
                    active={this.state.modal}
                    hide={this.hide}
                    mobile={this.props.mobile}
                />
            </Container>
        )
    }
}
