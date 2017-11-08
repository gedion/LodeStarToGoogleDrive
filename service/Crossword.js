const _ = require('lodash');
const striptags = require('striptags');
const Page = require('./Page.js');
const DOMParser = require('xmldom').DOMParser;
const xmlToJSON = require('xmlToJSON');

xmlToJSON.stringToXML = function (string) {
  return new DOMParser().parseFromString(string, 'text/xml');
};

class Crossword extends Page {

  constructor (options = {}) {
    super(options);
    this.setWords();
  }

  getWords() {
    this.setWords();
    return this.words;
  }
  /**
   *[ { word: 'word', hint: 'hint'} ]
   *
   */
  setWords (words = null) {
    this.words = words;
    if (_.isEmpty(this.words)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
          return o.input[0]._attr.optionStore._value == 'crosswordDataInput';
        });
        let wordsXmlStr =  _.get(this._options, `entrydata[${index}].input[0]._text`);

        let words = xmlToJSON.parseString(wordsXmlStr);
        words = _.get(words, 'data[0].dataPage');
        words = words.map((word) => {
          return {
            word: _.get(word, 'Word[0]._text'),
            hint: _.get(word, 'Hint[0]._text')
          }
        });
        this.words = words;
      } catch(error) {
        console.log(`Error setting Crossword Words : ${error}`);
      }
    }
  }

  toString() {
    return `
      title: ${this.title},
      totalPoints: ${this.totalPoints},
      words : ${this.words.join('\n')}
    `;
  }
}

module.exports = Crossword;
