import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

const BaseWrapper = styled.div`
    flex: 1 1 0;
    margin: 0.5rem;
    padding: 0.5rem;
    overflow: hidden;
    border: 0.01rem solid rgba(0, 0, 0, 0.5);
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
`

const MobileBaseWrapper = BaseWrapper.extend`
    overflow: scroll;
`

const DesktopBaseWrapper = BaseWrapper.extend`
    @media (max-width: 480px), (max-height: 270px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

const MobileChooseWrapper = MobileBaseWrapper.extend``

const MobileDisabledWrapper = MobileBaseWrapper.extend`
    opacity: 0.5;
`

const DesktopChooseWrapper = DesktopBaseWrapper.extend``

const DesktopDisabledWrapper = DesktopBaseWrapper.extend`
    opacity: 0.5;
`

const TitleBlock = styled.div`
    margin-bottom: 0.5rem;
    text-align: center;
    &:active {
        color: transparent;
    }
    ${DesktopChooseWrapper}:hover & {
        cursor: pointer;
    }
`

const MainTitle = styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: capitalize;
`

const SubTitle = styled.div`
    font-size: 0.7rem;
    font-style: italic;
    text-transform: lowercase;
`

const BaseText = styled.div`
    font-size: 0.8rem;
    overflow: hidden;
    text-align: justify;
`

const MobileText = BaseText.extend``

const DesktopText = BaseText.extend`
    height: 50%;
    overflow-y: scroll;
    @media (max-width: 480px), (max-height: 270px) {
        display: none;
    }
`

const BaseSource = styled.div`
    margin-top: 0.5rem;
    font-size: 0.7rem;
    text-align: right;
`

const MobileSource = BaseSource.extend``

const DesktopSource = BaseSource.extend`
    @media (max-width: 480px), (max-height: 270px) {
        text-align: center;
    }
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
        if (words.length <= 100) {
            return this.props.option.description
        }
        words = words.slice(0, 100)
        return `${words.join(' ')}  ...`
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
                return this.props.mobile
                    ? MobileChooseWrapper
                    : DesktopChooseWrapper

            case 'disabled':
                return this.props.mobile
                    ? MobileDisabledWrapper
                    : DesktopDisabledWrapper

            default:
                return this.props.mobile
                    ? MobileBaseWrapper
                    : DesktopBaseWrapper
        }
    }

    mobile() {
        const Wrapper = this.wrapper()
        return (
            <Wrapper>
                <TitleBlock onClick={this.props.action}>
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleBlock>
                <MobileText>{this.text()}</MobileText>
                <MobileSource>{this.source()}</MobileSource>
            </Wrapper>
        )
    }

    desktop() {
        const Wrapper = this.wrapper()
        return (
            <Wrapper>
                <TitleBlock onClick={this.props.action}>
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleBlock>
                <DesktopText>{this.text()}</DesktopText>
                <DesktopSource>{this.source()}</DesktopSource>
            </Wrapper>
        )
    }

    render() {
        if (this.props.mobile) {
            return this.mobile()
        } else {
            return this.desktop()
        }
    }
}
