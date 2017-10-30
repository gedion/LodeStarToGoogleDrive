const _ = require("lodash");
const striptags = require('striptags');

class Card {

  constructor (options = {}) {
    this._options = options;
    this.setTitle();
    this.setTotalPoints();
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

  getTotalPoints () {
    this.setTotalPoints();
    return this.totalPoints;
  }

  getTitle () {
    this.setTitle();
    return this.title;
  }

  setTitle (title = null) {
    this.title = title;
    if (_.isEmpty(this.title)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'Title';
        });
        this.title =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card title: ${error}`);
      }
    }
  }

  setTotalPoints (totalPoints = null) {
    this.totalPoints= totalPoints;
    if (_.isEmpty(this.totalPoints)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TotalPoints';
        });
        this.totalPoints =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card totalPoints : ${error}`);
      }
    }
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
