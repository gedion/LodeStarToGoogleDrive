const _ = require('lodash');
const Text = require('./Text');

class Texts {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.texts = [];
    let text;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Text') {
        text = new Text(option);
        this.texts.push(text);
      }
    });
  }

  getFormData () {
    return _.map(this.texts, (text) => ({
      value: text.getValue(),
      title: text.getTitle()
    }));
  }

  toString() {
    return this.texts.join('\n');
  }

}

module.exports = Texts;
