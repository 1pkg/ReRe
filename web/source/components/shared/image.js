// @flow

import React from 'react';
import GLReactImage from 'gl-react-image';
import * as GlReactDom from 'gl-react-dom';
import deepEqual from 'deep-equal';

import * as Model from './../../model';

import Bleached from './../../shaders/bleached';
import Sepia from './../../shaders/sepia';
import Pixelation from './../../shaders/pixelation';
import HorizontalBlur from './../../shaders/horizontal-blur';
import VerticalBlur from './../../shaders/vertical-blur';
import Bloom from './../../shaders/bloom';

const Effects: Array<any> = [
  Bleached,
  Sepia,
  Pixelation,
  HorizontalBlur,
  VerticalBlur,
  Bloom,
];

export default class Image extends React.Component {
  props: {
    image: Model.Image,
    effected: boolean,
  }

  state: {
    width: number,
    height: number,
    effect: any,
  }

  constructor(props: {
    image : Model.Image,
    effected: boolean,
  }) {
    super(props);
    this.state = {
      width: 1,
      height: 1,
      effect: Effects[Math.floor(Math.random() * Effects.length)],
    };

    window.addEventListener('resize', this.fit.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fit.bind(this));
  }

  shouldComponentUpdate(props: {
    image : Model.Image,
    effected: boolean,
  }, state: {
    width: number,
    height: number,
    effect: any,
  }) {
    return !deepEqual(props, this.props)
      || !deepEqual(state, this.state);
  }

  componentWillReceiveProps(props: {
    image : Model.Image,
    effected: boolean,
  }) {
    if (deepEqual(props, this.props)) {
      return;
    }

    this.setState((state: {
      width: number,
      height: number,
      effect: any,
    }) => {
      return {
        width: state.width,
        height: state.height,
        effect: Effects[Math.floor(Math.random() * Effects.length)],
      };
    });
  }

  fit() {
    this.setState((state: {
      width: number,
      height: number,
      effect: any,
    }) => {
      let element: HTMLElement|null = document.getElementById('image-holder');
      if (element) {
        return {
          width: element.getBoundingClientRect().width,
          height: element.getBoundingClientRect().height,
          effect: state.effect,
        };
      }

      return state;
    });
  }

  render() {
    if (!this.props.effected) {
      return (
        <div style={{
          flexGrow: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', maxWidth: '100vw',
        }}>
          <img src={this.props.image.sourceLink} style={{
              flexGrow: 1, objectFit: 'cover',
          }}/>
        </div>
      );
    }

    let Effect = this.state.effect;
    return (
      <div style={{
        flexGrow: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', maxWidth: '100vw',
      }} id="image-holder">
        <GlReactDom.Surface width={this.state.width} height={this.state.height} onLoad={this.fit.bind(this)}>
          <Effect size={[this.state.width, this.state.height]}>
            <GLReactImage source={this.props.image.sourceLink} resizeMode="cover"/>
        </Effect>
        </GlReactDom.Surface>
      </div>
    );
  }
}
