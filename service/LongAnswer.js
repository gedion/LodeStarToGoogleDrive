const _ = require("lodash");
const Page = require("./Page.js");
const striptags = require('striptags');

class LongAnswer extends Page {

  constructor (options = {}) {
    super(options);

    this.setInstructions();
    this.setHeading();
  }

  getInstructions () {
    this.setInstructions();
    return this.instructions;
  }

  getHeading () {
    this.setHeading();
    return this.heading;
  }

  setInstructions (instructions = null) {
    this.instructions = instructions;
    if (_.isEmpty(this.instructions)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'HTMLTextArea_1';
        });
        this.instructions =  _.get(this._options, `entrydata[${index}].input[0]._text`);
        this.instructions = striptags(this.instructions);
      } catch(error) {
        console.log(`Error setting LongAnswer insruction stem : ${error}`);
      }
    }
  }

  setHeading (heading = null) {
    this.heading = heading;
    if (_.isEmpty(this.heading)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TextArea_1';
        });
        this.heading =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting LongAnswer insruction stem : ${error}`);
      }
    }
  }


  toString() {
    return `
      ${super.toString()},
      instructions: ${this.instructions}
      heading: ${this.heading}
    `;
  }

}

module.exports = LongAnswer;

