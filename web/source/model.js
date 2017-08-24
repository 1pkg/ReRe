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
  options: Array<Option>,
  image: Image,
};

export type Hint = {
    id: number,
    name: string,
};

export const ACT_STATUS_PROCESS: string = 'act-status-process';
export const ACT_STATUS_FAILED: string  = 'act-status-failed';
export const ACT_STATUS_SUCCEED: string = 'act-status-succeed';

export type Act = {
  status: string,
  time: number,
  count: number,
};

export type State = {
  task: Task,
  hints: Array<Hint>,
  act: Act,
};
