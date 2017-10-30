const _ = require('lodash');
const MultipleChoiceQuestion = require('./MultipleChoiceQuestion');

class MultipleChoiceQuestions {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.questions = [];
    let question;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Multiple Choice Question' ||
          _.get(option, 'entrydata[0].input[0]._text') == 'Question (Layout B)'
          ) {
        question = new MultipleChoiceQuestion(option);
        this.questions.push(question);
      }
    });
  }

  getFormData () {
    return _.map(this.questions, (question) => ({
      title: question.getTitle(),
      points: question.getTotalPoints(),
      questionStem: question.getQuestionStem(),
      allowMultipleAnswers: question.getAllowMultipleAnswers(),
      choices: question.getChoices().getFormData()
    }));
  }

  toString() {
    return this.questions.join('\n');
  }

}

module.exports = MultipleChoiceQuestions;
