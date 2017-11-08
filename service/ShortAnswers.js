const _ = require('lodash');
const ShortAnswer = require('./ShortAnswer');

class ShortAnswers {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.shortAnswers = [];
    let shortAnswer;
    _.each(options, (option) => {
      let shortAnswer;
      if (_.get(option, 'entrydata[0].input[0]._text') == 'ShortAnswer') {
        shortAnswer = new ShortAnswer(option);
        this.shortAnswers.push(shortAnswer);
      }
    });
  }

  getFormData () {
    return _.map(this.shortAnswers, (shortAnswer) => ({
      type: shortAnswer.getType(),
      title: shortAnswer.getTitle(),
      points: shortAnswer.getTotalPoints(),
      answer: shortAnswer.getAnswer(),
      question: shortAnswer.getQuestion(),
      shortPrompt: shortAnswer.getShortPrompt(),
      regEx: shortAnswer.getRegEx()
    }));
  }

  toString() {
    return this.shortAnswers.join('\n');
  }

}

module.exports = ShortAnswers;
