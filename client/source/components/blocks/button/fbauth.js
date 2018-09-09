import React from 'react'
import { FaFacebookF } from 'react-icons/fa'

import Button from './beacon'

export default class extends React.Component {
    render() {
        return <Button glyph={FaFacebookF} hint="login via facebook" />
    }
}
