// @flow

export type Option = {
    name: string,
    category: string,
    hint: string,
}

export type Task = {
    options: Array<Option>,
    option: number,

    subject: string,
    effects: Array<string>,

    reference: string,
    statistic: Array<number>,
}

export type Entry = {
    timestamp: number,
    status: string,
    number: number,
    score: number,

    assists: Array<string>,
}

export type State = {
    identifier: string,
    settings: {
        [string]: string,
    },
    entry: ?Entry,
    task: ?Task,
}
