const getWord = async (word) => {
  const infoNode = await getInfoNode(word);

  if (infoNode === null) return;
  
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
};

const getSuggestions = (text) => {
  return fetch(
    `http://dictionary.cambridge.org/autocomplete/english-spanish/?q=${text}&contentType=application%2Fjson%3B%20charset%3Dutf-8`)
    .then(response => response.json())
    .then(response => response.results);
};

async function getInfoNode(word) {
  const response = await fetch(`http://dictionary.cambridge.org/dictionary/english-spanish/${word}`);
  const div = document.createElement('div');
  
  if (response.url === 'http://dictionary.cambridge.org/dictionary/english-spanish/') {
    return null;
  }

  div.innerHTML = await response.text();
  return div;
}

function mapQSelector(context, selector, fn) {
  return Array.prototype.map.call(context.querySelectorAll(selector), fn);
}

function getDefinition(context) {
  const element = context.querySelector('.def');
  return element ? text(element) : null;
}

function getTranslation(context) {
  return text(context.querySelector('.trans'));
}

function getExamples(context) {
  return mapQSelector(context, '.eg', text);
}

function getWordType(context) {
  return text(
    context
    .closest('.datasource')
    .querySelector('.posgram .pos')
  );
}

function getPhrase(context) {
  return text(context.querySelector('.phrase'));
}

function getRunonTitle(context) {
  return text(context.querySelector('.w'));
}

function text(element) {
  // Replacing due to a bug with firebase
  return element.textContent.trim().replace(/’/g, "'");
}

export { getWord, getSuggestions };
