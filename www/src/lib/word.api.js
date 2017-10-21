import * as firebase from 'firebase';
import config from '../config';
import { getWord } from './dictionary';

firebase.initializeApp(config.firebase);
firebase.auth()
  .signInWithEmailAndPassword('hawkins.dom@gmail.com', 'master')
  .catch(console.error);

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
//   }
// ];

let words = [];
const wordsRef = firebase.database().ref('/words');

const api = {
  async find({ word }={}) {
    if (typeof word === 'string' && word.trim().length) {
      word = word.toLowerCase();
      
      const localWord = words.find(w => w.word === word);
      if (localWord !== undefined) {
        return localWord;
      }

      // Cambridge dictionary doesn't understand spaces
      word = word.replace(' ', '-').toLowerCase();
      
      const wordObj = await getWord(word);
      if (wordObj === undefined) return;

      console.log(wordObj);

      const newRef = wordsRef.push();
      newRef.set(wordObj, console.error);
      
      const newWord = { id: newRef.key, ...wordObj };
      words.push(newWord);
      return newWord;
    }

    if (words.length === 0) {
      words = await loadWords();
    }
    return words;
  }
};

function loadWords() {
  return new Promise((resolve, reject) => {
    wordsRef.once('value', snapshot => {
      const data = [];

      snapshot.forEach(child => {
        const value = child.val();
        data.push({ id: child.key, ...value });
      });

      resolve(data);
    });
  });
}

export default api;