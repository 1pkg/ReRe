// @flow

import React from 'react';

import infinite from '../../static/infinite.png';
import redo from '../../static/redo.png';
import twoothree from '../../static/2of3.png';
import skip from '../../static/skip.png';
import ga from '../../static/ga.png';
import help from '../../static/help.png';
const icons = {
  infinite,
  redo,
  twoothree,
  skip,
  ga,
  help,
};

export default class ToolBar extends React.Component {
  props: {
    id: number,
    name: string,
    use: (event: Event) => void,
  }

  render() {
    if (!(this.props.name in icons)) {
      return null;
    }

    return (
      <img style={{
        marginLeft: '12px', height: '100%',  objectFit: 'contain'}
      } onClick={this.props.use} src={icons[this.props.name]} data-id={this.props.id}/>
    );
  }
}
