const _ = require("lodash");
const Choice = require("./Choice.js");

class Choices {

  constructor (configs = [], checkBoxConfigs = []) {
    this.configs = configs;
    this.choices = [];
    let choice;
    _.each(configs, (config, index) => {
      choice = new Choice(config, _.get(checkBoxConfigs, index));
      this.choices.push(choice);
    });

  }

  getFormData () {
    return _.map(this.choices , (choice) => ({
      value: choice.getValue(),
      correct: choice.getCorrect(),
    }));
  }

  toString () {
    return `
      ${this.choices.join('')}
    `;
  }

}

module.exports = Choices;
