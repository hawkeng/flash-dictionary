const dictionary = {
  async getWord(word) {
    const infoNode = await getInfoNode(word);
    
    const definitions = mapQSelector(infoNode, '.def-block', el => {
      return {
        type: getWordType(el),
        definition: getDefinition(el),
        translation: getTranslation(el),
        examples: getExamples(el)
      }
    });

    const runons = mapQSelector(infoNode, '.runon', el => {
      return {
        title: getRunonTitle(el),
        type: getWordType(el),
        definition: getDefinition(el),
        translation: getTranslation(el),
        examples: getExamples(el)
      };
    });

    const phrases = mapQSelector(infoNode, '.phrase-block', el => {
      return {
        phrase: getPhrase(el),
        definition: getDefinition(el),
        translation: getTranslation(el),
        examples: getExamples(el)
      };
    });

    return {
      word,
      sound: infoNode.querySelector('.sound.us').dataset.srcMp3,
      definitions,
      runons,
      phrases
    };
  },
};

async function getInfoNode(word) {
  const response = await fetch(`http://dictionary.cambridge.org/dictionary/english-spanish/${word}`);
  const div = document.createElement('div');
  div.innerHTML = await response.text();
  return div;
}

function mapQSelector(context, selector, fn) {
  return Array.prototype.map.call(context.querySelectorAll(selector), fn);
}

function getDefinition(context) {
  return context.querySelector('.def').innerHTML;
}

function getTranslation(context) {
  return context.querySelector('.trans').textContent.trim();
}

function getExamples(context) {
  return mapQSelector(context, '.eg', el => el.innerHTML);
}

function getWordType(context) {
  return context
    .closest('.datasource')
    .querySelector('.posgram .pos')
    .textContent
    .trim();
}

function getPhrase(context) {
  return context.querySelector('.phrase').textContent.trim();
}

function getRunonTitle(context) {
  return context.querySelector('.w').textContent.trim();
}

export default dictionary;