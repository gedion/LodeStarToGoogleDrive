const _ = require("lodash");
const Page = require("./Page.js");
const Choices = require("./Choices.js");
const striptags = require('striptags');

class Menu extends Page {

  constructor (options = {}) {
    super(options);

    this.setInstructions();
    this.setChoices();
  }

  getInstructions () {
    this.setInstructions();
    return this.instructions;
  }

  getChoices () {
    this.setChoices();
    return this.choices;
  }

  setChoices (choices = null) {
    this.choices = choices;
    let textAreas = ['TextArea_3', 'TextArea_4','TextArea_5', 'TextArea_6'];

    if (_.isEmpty(this.choices)) {
      let choiceOptions = _.filter(this._options.entrydata, (o) => {
        return _.includes(textAreas, _.get(o, 'input[0]._attr.optionStore._value'));
      });
      this.choices = new Choices(choiceOptions);
    }
  }

  toString() {
    return `
      ${super.toString()},
      columns: [${this.columnLeft, this.columnRight}],
      rows : ${this.choicesLeft.join("\n") + this.choicesRight.join("\n")}
    `;
  }

  setInstructions (instructions = null) {
    this.instructions = instructions;
    if (_.isEmpty(this.instructions)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_2';
        });
        this.instructions =  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.instructions = striptags(this.instructions);
      } catch(error) {
        console.log(`Error setting Menu insruction stem : ${error}`);
      }
    }
  }

}

module.exports = Menu;
