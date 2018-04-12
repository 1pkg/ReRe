import Lodash from 'lodash'
import React from 'react'
import Swipeable from 'react-swipeable'
import styled from 'styled-components'

const Container = styled(Swipeable)`
    flex: 1 1 0;
    display: flex;
    overflow: hidden;
`

const Wrapper = styled.div`
    flex: 1 0 100%;
    order: ${props => props.order};
    display: flex;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    componentDidMount() {
        let size = this.props.children.length - 1
        let index = this.props.option ? this.props.option : 0
        this.setState(state => {
            return { size, index }
        })
    }

    next = () => {
        if (this.state.index >= this.state.size) {
            return
        }

        this.setState(state => {
            return {
                size: this.state.size,
                index: this.state.index + 1,
            }
        })
    }

    previous = () => {
        if (this.state.index <= 0) {
            return
        }

        this.setState(state => {
            return {
                size: this.state.size,
                index: this.state.index - 1,
            }
        })
    }

    render() {
        if (!this.state) return null

        return (
            <Container onSwipedRight={this.previous} onSwipedLeft={this.next}>
                {Lodash.map(this.props.children, (child, index) => {
                    let order = index === this.state.index ? 0 : 1
                    return (
                        <Wrapper key={index} order={order}>
                            {child}
                        </Wrapper>
                    )
                })}
            </Container>
        )
    }
}
