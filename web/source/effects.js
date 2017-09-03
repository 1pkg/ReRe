// @flow

import * as Constants from './constants';

export function hover(event: SyntheticEvent) {
  if(event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.color = Constants.COLOR_HOVER;
  }
};

export function unhover(event: SyntheticEvent) {
  if(event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.color = Constants.COLOR_MAIN;
  }
};
