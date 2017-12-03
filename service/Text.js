const _ = require('lodash');
const Page = require('./Page.js');

class Text extends Page {

  constructor (options = {}) {
    super(options);
    this.setValue();
  }

  getValue () {
    return this.value;
  }

  setValue (value = null) {
    this.value = value;
    if (_.isEmpty(this.value)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'HTMLTextArea_1';
        });
        this.value =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting Text value : ${error}`);
      }
    }
  }

  toString () {
    return `
      value: ${this.value},
    `;
  }
}

module.exports = Text;
