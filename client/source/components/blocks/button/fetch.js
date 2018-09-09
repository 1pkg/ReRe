import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './base'

export default class extends React.Component {
    fetch = async () => {
        this.props.trigger.call(Trigger.ACTION_FETCH)
    }

    render() {
        return (
            <Button
                glyph={FaAngleDoubleRight}
                hint={'next'}
                action={this.fetch}
            />
        )
    }
}
