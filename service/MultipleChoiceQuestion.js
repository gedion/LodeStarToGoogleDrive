const _ = require("lodash");
const Page = require("./Page.js");
const Choices = require("./Choices.js");

class MultipleChoiceQuestion extends Page {

  constructor (options = {}) {
    super(options);

    this.setChoices();
    this.setQuestionStem();
    this.setAllowMultipleAnswers();
  }

  getAllowMultipleAnswers () {
    this.setAllowMultipleAnswers();
    return this.allowMultipleAnswers;
  }
  getChoices () {
    this.setChoices();
    return this.choices;
  }

  getQuestionStem () {
    this.setQuestionStem();
    return this.questionStem;
  }

  setQuestionStem (questionStem = null) {
    this.questionStem = questionStem;
    if (_.isEmpty(this.questionStem)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_2';
        });
        this.questionStem =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card question stem : ${error}`);
      }
    }
  }

  setChoices (choices = null) {
    this.choices = choices;
    let textAreas = [];
    let checkboxes = [];
    if (_.includes(['Question (Layout B)','Multiple Choice Question' ],this.type)) {
      textAreas = ['TextArea_3', 'TextArea_4', 'TextArea_5', 'TextArea_6', 'TextArea_7'];
      checkboxes = ['Checkbox_1', 'Checkbox_2', 'Checkbox_3', 'Checkbox_4', 'Checkbox_5'];
    } else if (this.type == 'Question (Layout C)') {
      textAreas = ['TextArea_3', 'TextArea_4', 'TextArea_5'];
      checkboxes = ['Checkbox_1', 'Checkbox_2', 'Checkbox_3'];
    }
    if (_.isEmpty(this.choices)) {
      let choiceOptions = _.filter(this._options.entrydata, (o) => {
        return _.includes(textAreas, _.get(o, 'input[0]._attr.optionStore._value'));
      });
      let choiceCheckBoxOptions = _.filter(this._options.entrydata, (o) => {
        return _.includes(checkboxes, _.get(o, 'input[0]._attr.optionStore._value'));
      });
      this.choices =  new Choices(choiceOptions, choiceCheckBoxOptions);
    }
  }

  setAllowMultipleAnswers (allowMultipleAnswers = null) {
    this.allowMultipleAnswers = allowMultipleAnswers;
    if (_.isEmpty(this.allowMultipleAnswers)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'Checkbox_MC';
        });
        this.allowMultipleAnswers = ! _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card question stem : ${error}`);
      }
    }
  }

  toString() {
    return `
      ${super.toString()},
      questionStem: ${this.questionStem}
      choices : ${this.choices.toString()}
      allowMultipleAnswers: ${this.allowMultipleAnswers}
    `;
  }

}

module.exports = MultipleChoiceQuestion;
