const _ = require('lodash');
const Card = require('./Card');

class FlashCards {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.cards = [];
    let card;
    _.each(options, (option) => {
      let card;
      if (_.get(option, 'entrydata[0].input[0]._text') == 'FlashCards') {
        card = new Card(option);
        this.cards.push(card);
      }
    });
  }

  getFormData () {
    return _.map(this.cards, (card) => ({
      type: card.getType(),
      title: card.getTitle(),
      description: card.getDesc(),
      points: card.getTotalPoints(),
      answer: card.getAnswers()[0],
    }));
  }

  toString() {
    return this.cards.join('\n');
  }

}

module.exports = FlashCards;
