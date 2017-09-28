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
  correctoption: string,
};

export type Entry = {
  timestamp: number,
  status: string,
  score: number,
  identifier: string,
};

export type State = {
  task: Task,
  assists: Array<string>,
  entry: Entry,
};
