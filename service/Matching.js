const _ = require("lodash");
const Page = require("./Page.js");
const Choices = require("./Choices.js");
const striptags = require('striptags');

class Matching extends Page {

  constructor (options = {}) {
    super(options);

    this.setColumnLeft();
    this.setColumnRight();

    this.setChoicesLeft();
    this.setChoicesRight();

    this.setInstructions();

  }

  getInstructions () {
    this.setInstructions();
    return this.instructions;
  }

  getColumnLeft() {
    return this.columnLeft;
  }

  getColumnRight () {
    return this.columnRight;
  }

  getChoicesLeft () {
    this.setChoicesLeft();
    return this.choicesLeft;
  }

  getChoicesRight () {
    this.setChoicesRight();
    return this.choicesRight;
  }

  setChoicesLeft (choicesLeft) {
    this.setChoices('choicesLeft', choicesLeft);
  }

  setChoicesRight (choicesRight) {
    this.setChoices('choicesRight', choicesRight);
  }

  setColumnLeft (columnLeft) {
    this.columnLeft = columnLeft || [];
  }

  setColumnRight (columnRight) {
    this.columnRight = columnRight || [];
  }

  setColumn(column, textArea, value) {
    this[column] = value; if (_.isEmpty(this[column])) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == textArea;
        });
        this[column] =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting ${column} stem : ${error}`);
      }
    }
  }

  setChoices (choiceType, choices = null) {
    this[choiceType] = choices;
    let checkboxes = [];
    let textAreas = [];

    if (choiceType == 'choicesLeft') {
      textAreas = ['TextArea_1', 'TextArea_3','TextArea_5', 'TextArea_7','TextArea_9'];
    } else {
      textAreas = ['TextArea_2', 'TextArea_4','TextArea_6', 'TextArea_8','TextArea_10'];
    }

    if (_.isEmpty(this.choices)) {
      let choiceOptions = _.filter(this._options.entrydata, (o) => {
        return _.includes(textAreas, _.get(o, 'input[0]._attr.optionStore._value'));
      });
      this[choiceType] = new Choices(choiceOptions);
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
         return o.input[0]._attr.optionStore._value == 'Instructions';
        });
        this.instructions =  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.instructions = striptags(this.instructions);
      } catch(error) {
        console.log(`Error setting Matching insruction stem : ${error}`);
      }
    }
  }

}

module.exports = Matching;
