const _ = require('lodash');
const Crossword = require('./Crossword');

class Crosswords {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.crosswords = [];
    let crossword;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Crossword') {
        crossword = new Crossword(option);
        this.crosswords.push(crossword);
      }
    });
  }

  getFormData () {
    return _.map(this.crosswords, (crossword) => ({
      type: crossword.getType(),
      title: crossword.getTitle(),
      points: crossword.getTotalPoints(),
      words: crossword.getWords(),
    }));
  }

  toString() {
    return this.crosswords.join('\n');
  }

}

module.exports = Crosswords;
