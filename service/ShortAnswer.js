const _ = require('lodash');
const striptags = require('striptags');
const Page = require('./Page.js');

class ShortAnswer extends Page {

  constructor (options = {}) {
    super(options);

    this.setAnswer();
    this.setQuestion();
    this.setShortPrompt();
    this.setRegEx();
  }

  getAnswer() {
    this.setAnswer();
    return this.answer;
  }

  getQuestion () {
   this.setQuestion();
   return this.question;
  }

  getShortPrompt () {
   this.setShortPrompt();
   return this.shortPrompt;
  }

  getRegEx () {
   this.setRegEx();
   return this.regEx;
  }

  setQuestion (question = null) {
    this.question = question;
    if (_.isEmpty(this.question)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_2';
        });
        this.question=  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.question = striptags(this.question);
      } catch(error) {
        console.log(`Error setting short answer question : ${error}`);
      }
    }
  }

  setAnswer (answer = null) {
    this.answer = answer;
    if (_.isEmpty(this.answer)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_3';
        });
        this.answer =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting answer : ${error}`);
      }
    }
  }

  setShortPrompt (shortPrompt = null) {
    this.shortPrompt = shortPrompt;
    if (_.isEmpty(this.shortPrompt)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_4';
        });
        this.shortPrompt =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting short prompt: ${error}`);
      }
    }
  }

  setRegEx (regEx = null) {
    this.regEx = regEx;
    if (_.isEmpty(this.regEx)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'RegEx_CheckBox';
        });
        this.regEx =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting short prompt: ${error}`);
      }
    }
  }

  toString () {
    return `
      title: ${this.title},
      totalPoints: ${this.totalPoints},
      question: ${this.question},
      answer: ${this.answer},
      shortPrompt: ${this.shortPrompt},
      regEx: ${this.regEx}
    `;
  }
}

module.exports = ShortAnswer;
