const _ = require("lodash");
const Page = require("./Page.js");
const Choices = require("./Choices.js");

class Category extends Page {
constructor (options = {}) {
    super(options);

    this.setColumnLeft();
    this.setColumnRight();

    this.setChoicesLeft();
    this.setChoicesRight();

    
  }

  getColumnLeft() {
    this.setColumnLeft();
    return this.columnLeft;
  }

  getColumnRight () {
    this.setColumnRight();
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
    this.setColumn('columnLeft', 'TextArea_1', columnLeft);
  }

  setColumnRight (columnRight) {
    this.setColumn('columnRight', 'TextArea_2', columnRight);
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
      textAreas = ['TextArea_3','TextArea_5', 'TextArea_7','TextArea_9'];
    } else {
      textAreas = ['TextArea_4','TextArea_6', 'TextArea_8','TextArea_10'];
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
      rows : ${this.choicesLeft.join("\n") + this.choicesRight.join("\n")}}
    `;
  }

}

module.exports = Category;
