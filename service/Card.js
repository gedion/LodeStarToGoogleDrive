const _ = require('lodash');
const striptags = require('striptags');
const Page = require('./Page.js');

class Card extends Page {

  constructor (options = {}) {
    super(options);
    this.setDesc();
    this.setAnswers();
  }

  getAnswers() {
    this.setAnswers();
    return this.answers;
  }

  getDesc() {
   this.setDesc();
   return this.desc;
  }

  setDesc(desc = null) {
    this.desc = desc;
    if (_.isEmpty(this.desc)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_2';
        });
        this.desc =  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.desc = striptags(this.desc);
      } catch(error) {
        console.log(`Error setting card desc : ${error}`);
      }
    }
  }

  setAnswers (answers = null) {
    this.answers = answers;
    if (_.isEmpty(this.answers)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_3';
        });
        this.answers =  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.answers = _.split(this.answers, '|');
      } catch(error) {
        console.log(`Error setting card answers : ${error}`);
      }
    }
  }

  toString() {
    return `
      title: ${this.title},
      totalPoints: ${this.totalPoints},
      description: ${this.desc}
      answers: ${this.answers.join(' or ')}
    `;
  }
}

module.exports = Card;
