// @flow

import React from 'react';
import GLReactImage from 'gl-react-image';
import * as GlReactDom from 'gl-react-dom';
import DeepEqual from 'deep-equal';

import * as Model from './../../model';
import * as Constants from './../../constants';

import Bleached from './../../shaders/bleached';
import Bloom from './../../shaders/bloom';
import BlurHorizontal from './../../shaders/blur-horizontal';
import BlurVertical from './../../shaders/blur-vertical';
import Crosshatch from './../../shaders/crosshatch';
import Pixelation from './../../shaders/pixelation';
import Sepia from './../../shaders/sepia';
import WaveHorizontal from './../../shaders/wave-horizontal';
import WaveVertical from './../../shaders/wave-vertical';

const Effects = {
  [Constants.EFFECT_NAME_BLEACHED]: Bleached,
  [Constants.EFFECT_NAME_BLOOM]: Bloom,
  [Constants.EFFECT_NAME_BLUR_HORIZONTAL]: BlurHorizontal,
  [Constants.EFFECT_NAME_BLUR_VERTICAL]: BlurVertical,
  [Constants.EFFECT_NAME_CROSSHATCH]: Crosshatch,
  [Constants.EFFECT_NAME_PIXELATION]: Pixelation,
  [Constants.EFFECT_NAME_SEPIA]: Sepia,
  [Constants.EFFECT_NAME_WAVE_HORIZONTAL]: WaveHorizontal,
  [Constants.EFFECT_NAME_WAVE_VERTICAL]: WaveVertical,
};

export default class Image extends React.Component {
  props: {
    image: Model.Image,
    effected: boolean,
  }

  state: {
    width: number,
    height: number,
  }

  constructor(props: {
    image : Model.Image,
    effected: boolean,
  }) {
    super(props);
    this.state = {
      width: 1,
      height: 1,
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
  }) {
    return !DeepEqual(props, this.props)
      || !DeepEqual(state, this.state);
  }

  fit() {
    this.setState((state: {
      width: number,
      height: number,
    }) => {
      let element: HTMLElement|null = document.getElementById('image-holder');
      if (element) {
        return {
          width: element.getBoundingClientRect().width,
          height: element.getBoundingClientRect().height,
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

    let View = null;
    this.props.image.effects.forEach((effect) => {
      if (!(effect in Effects)) {
        return;
      }
      
      let Effect = Effects[effect];
      if (!View) {
        View = (
          <Effect size={[this.state.width, this.state.height]}>
            <GLReactImage source={this.props.image.sourceLink} resizeMode="cover"/>
          </Effect>
        );
      } else {
        View = (
          <Effect size={[this.state.width, this.state.height]}>{
            View
          }</Effect>
        );
      }
    });

    return (
      <div style={{
        flexGrow: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', maxWidth: '100vw',
      }} id="image-holder">
        <GlReactDom.Surface width={this.state.width} height={this.state.height} onLoad={this.fit.bind(this)}>{
          View
        }</GlReactDom.Surface>
      </div>
    );
  }
}
