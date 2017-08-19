// @flow

import React from 'react';

import * as Model from './../model'

export default class Image extends React.Component {
  props: {
    image : Model.Image,
  }

  render() {
    return (
      <div style={{
        width: '100%', height: '80vh', overflow: 'hidden',
      }}>
        <img style={{
          width: '100%', objectFit: 'cover',
        }} src={this.props.image.sourceLink} />
      </div>
    );
  }
}
