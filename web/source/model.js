// @flow

export type Option = {
    name: string,
    category: string,
    references: Array<string>,
};

export type Task = {
  options: Array<Option>,
  subject: string,
  effects: Array<string>,
  option: number,
  references: Array<string>,
  stats: Array<string>,
};

export type State = {
  identifier: string,
  timestamp: number,
  status: string,
  task: Task,
  assists: Array<string>,
  score: number,
};
