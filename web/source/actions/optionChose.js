import * as Model from './../model';
import * as Actions from './types';

const nextOptions: [Model.Option, Model.Option, Model.Option] = [
  {
    id: 1,
    name: 'Siminov',
    category: 'youtuber',
    links: [],
    hintMessages: [],
  },
  {
    id: 3,
    name: 'Maddyson',
    category: 'streamer',
    links: [],
    hintMessages: [],
  },
  {
    id: 4,
    name: 'Khovan',
    category: 'youtuber',
    links: [],
    hintMessages: [],
  },
];

const nextImage: Model.Image = {
  id: 1,
  sourceLink: 'http://s1.storage.akamai.coub.com/get/b34/p/coub/simple/cw_timeline_pic/25afdb36b40/490f1029e9198495a1b88/big_1442331374_image.jpg',
  sourceAlt: 'S. Simonov',
  optionId: 1,
};

const nextTask: Model.Task = {
  options: nextOptions,
  image: nextImage,
};

export default (dispatch: (Model.Action) => void, optionId: number) => {
  if (optionId == 2) {
    dispatch({
      type: Actions.ACTION_OPTION_CHOSE,
      payload: {
        task: nextTask
      }
    });
  } else {
    console.log('failed');
  }
}
