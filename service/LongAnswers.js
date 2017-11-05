const _ = require('lodash');
const LongAnswer = require('./LongAnswer');

class LongAnswers {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.longAnswers= [];
    let longAnswer;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Long Answer') {
        longAnswer = new LongAnswer(option);
        this.longAnswers.push(longAnswer);
      }
    });
  }

  getFormData () {
    return _.map(this.longAnswers, (longAnswer) => ({
      type: longAnswer.getType(),
      title: longAnswer.getTitle(),
      points: longAnswer.getTotalPoints(),
      heading: longAnswer.getHeading(),
      instructions: longAnswer.getInstructions(),
    }));
  }

  toString() {
    return this.longAnswers.join('\n');
  }

}

module.exports = LongAnswers;
