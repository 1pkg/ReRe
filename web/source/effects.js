// @flow

export function hover(event: Event) {
  if(event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.color = '#B0E0E6';
  }
};

export function unhover(event: Event) {
  if(event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.color = '#C0C0C0';
  }
};
