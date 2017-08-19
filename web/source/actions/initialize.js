import * as Model from './../model';
import * as Actions from './types';

const initialOptions: [Model.Option, Model.Option, Model.Option] = [
  {
    id: 0,
    name: 'PewDiePie',
    category: 'youtuber',
    links: [],
    hintMessages: [],
  },
  {
    id: 1,
    name: 'Siminov',
    category: 'youtuber',
    links: [],
    hintMessages: [],
  },
  {
    id: 2,
    name: 'Trump',
    category: 'president',
    links: [],
    hintMessages: [],
  },
];

const initialImage: Model.Image = {
  id: 0,
  sourceLink: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/161107120239-01-trump-parry-super-169.jpg',
  sourceAlt: 'D. Trump',
  optionId: 2,
};

const intialTask: Model.Task = {
  options: initialOptions,
  image: initialImage,
};

const initialHints: Array<Model.Hint> = [
  {
    id: 0,
    name: 'infinite',
  },
  {
    id: 1,
    name: 'redo',
  },
  {
    id: 2,
    name: '2of3',
  },
  {
    id: 3,
    name: 'skip',
  },
  {
    id: 4,
    name: 'ga',
  },
  {
    id: 5,
    name: 'help',
  },
];

export default (dispatch: (Model.Action) => void) => {
  dispatch({
    type: Actions.ACTION_INITIALIZE,
    payload: {
      task: intialTask,
      hints: initialHints,
    }
  });
}
