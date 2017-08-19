// @flow

import React from 'react';

import * as Model from './../model'

export default class Image extends React.Component {
  props: {
    image : Model.Image,
  }

  render() {
    let image : Model.Image = this.props.image;
    return (
      <div style={{
        width: '100%', height: '80vh', overflow: 'hidden'
      }}>
        <img style={{
          width: '100%', objectFit: 'cover'
        }} src={image.sourceLink} />
      </div>
    );
  }
}
