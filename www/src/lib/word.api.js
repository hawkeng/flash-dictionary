import { getWord } from './dictionary';

// const mockData = [
//   {
//     id: 1,
//     word: 'Word 1',
//     createdAt: '2017-10-03T17:24:07.110Z',
//     timesVisited: 1,
//     status: null,
//     sound: 'http://dummy-sound.com',
//     definitions: [
//       {
//         definition: 'Demo definition',
//         type: 'noun',
//         translation: 'Demo Translation',
//         examples: [
//           'Example sentence 1',
//           'Example sentence 2'
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     word: 'Word 2',
//     createdAt: '2017-10-03T17:24:07.110Z',
//     timesVisited: 2,
//     status: 'prioritize',
//     sound: 'http://dummy-sound.com',
//     definitions: [
//       {
//         definition: 'Demo definition',
//         type: 'noun',
//         translation: 'Demo Translation',
//         examples: [
//           'Example sentence 1',
//           'Example sentence 2'
//         ]
//       }
//     ]
//   }
// ];

const mockData = [
  { word: 'Quaint' },
  { word: 'Harverst' }
];

const api = {
  find({ word }={}) {
    if (word !== undefined && word.length) {
      // return Promise.resolve(mockData.find(w => w.word === word));
      word = word.replace(' ', '-').toLowerCase();
      return getWord(word);
    }
    return Promise.resolve(mockData);
  }
};

export default api;