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
    effects: Array<string>,
};

export type Task = {
  id: number,
  options: Array<Option>,
  image: Image,
  correctOption: number,
};

export type Hint = {
    id: number,
    name: string,
};

export type Act = {
  status: string,
  timestamp: number,
  score: number,
};

export type State = {
  task: Task,
  hints: Array<Hint>,
  act: Act,
};
