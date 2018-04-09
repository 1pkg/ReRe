import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

const BaseWrapper = styled.div`
    flex: 1 1 0;
    width: 100%;
    height: 100%;
    margin: 0.5rem;
    padding: 0.3rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.5);
`

const ChooseWrapper = BaseWrapper.extend`
    &:hover {
        box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
    }
`

const DisabledWrapper = BaseWrapper.extend`
    opacity: 0.5;
    text-decoration: line-through;
`

const TitleBlock = styled.div`
    margin-bottom: 0.5rem;
    text-align: center;
`

const MainTitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
`

const SubTitle = styled.div`
    font-size: 0.5rem;
    color: gray;
    text-transform: lowercase;
`

const Text = styled.div`
    font-size: 0.5rem;
    height: 50%;
    overflow: hidden;
    text-align: justify;
`

const Source = styled.div`
    margin-top: 0.5rem;
    font-size: 0.5rem;
    text-align: right;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    title() {
        let parts = this.props.option.name.match(/(.*) \((.*)\)/)
        return parts[1]
    }

    subtile() {
        let parts = this.props.option.name.match(/(.*) \((.*)\)/)
        return parts[2]
    }

    text() {
        let words = this.props.option.description.split(' ')
        words = words.slice(0, 100)
        return words.join(' ')
    }

    source() {
        return (
            <a href={this.props.option.link} target="_blank">
                {this.props.option.source}
            </a>
        )
    }

    wrapper() {
        switch (this.props.wrapper) {
            case 'choose':
                return ChooseWrapper

            case 'disabled':
                return DisabledWrapper

            default:
                return BaseWrapper
        }
    }

    render() {
        let Wrapper = this.wrapper()
        return (
            <Wrapper onClick={this.props.action}>
                <TitleBlock>
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleBlock>
                <Text>{this.text()}</Text>
                <Source>{this.source()}</Source>
            </Wrapper>
        )
    }
}
