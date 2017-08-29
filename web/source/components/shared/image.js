// @flow

import React from 'react';

import * as Model from './../../model';

export default class Image extends React.Component {
  props: {
    image : Model.Image,
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img style={{
          flexGrow: 1,
          maxWidth: '100vw', maxHeight: '77vh', objectFit: 'cover',
        }} src={this.props.image.sourceLink}/>
      </div>
    );
  }
}
