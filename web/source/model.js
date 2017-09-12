// @flow

export type Option = {
    name: string,
    category: string,
    references: Array<string>,
};

export type Subject = {
    sourcelink: string,
    sourcealt: string,
    effects: Array<string>,
};

export type Task = {
  options: Array<Option>,
  subject: Subject,
  correctOption: number,
};

export type Hint = {
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
