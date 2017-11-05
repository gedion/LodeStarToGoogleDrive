const _ = require('lodash');
const Matching = require('./Matching');

class Matchings {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.matchings = [];
    let matching;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Matching') {
        matching = new Matching(option);
        this.matchings.push(matching);
    }
    });
  }

  getFormData () {
    return _.map(this.matchings, (matching) => ({
      type: matching.getType(),
      title: matching.getTitle(),
      points: matching.getTotalPoints(),
      columnsLeft: matching.getColumnLeft(),
      columnsRight: matching.getColumnRight(),
      rowsLeft: matching.getChoicesLeft().getFormData(),
      rowsRight: matching.getChoicesRight().getFormData(),
      instructions: matching.getInstructions()
    }));
  }

  toString() {
    return this.matchings.join('\n');
  }
}

module.exports = Matchings;
