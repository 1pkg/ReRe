// @flow

export type Option = {
    id: number,
    name: string,
    category: string,
    links: Array<string>,
    hintMessages: Array<string>,
};

export type Image = {
    id: number,
    sourceLink: string,
    sourceAlt: string,
    optionId: number,
};

export type Task = {
  options: [Option, Option, Option],
  image: Image,
};

export type Hint = {
    id: number,
    name: string,
};

export type Action = {
  type: string,
  payload: any,
};
