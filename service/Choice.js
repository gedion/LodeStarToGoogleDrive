const _ = require("lodash");

class Choice {

  constructor (configs = {}, checkBoxConfig = {}) {
    this.configs = configs ;
    this.checkBoxConfig = checkBoxConfig;
    this.setValue();
    this.setCorrect();
  }

 getCorrect () {
   this.setCorrect();
   return this.correct;
 }

 getValue () {
    this.setValue();
    return this.value;
 }

 setValue (value) {
    this.value = value;
    if (_.isEmpty(this.value)) {
      try {
        this.value = _.get(this.configs, 'input[0]._text');
      } catch(error) {
        console.log(`Error setting card answers : ${error}`);
      }
    }
  }

  setCorrect (correct = null) {
    this.correct = correct;
    if (! _.isBoolean(this.correct)) {
      try {
        this.correct = _.get(this.checkBoxConfig, 'input[0]._text');
      } catch(error) {
        console.log(`Error setting Choice correctness : ${error}`);
      }
    }
  }

  toString () {
    return `
      value: ${this.value},
      is Correct answer : ${this.correct}
    `;
  }

}

module.exports = Choice;
