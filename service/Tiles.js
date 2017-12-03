const _ = require('lodash');
const Tile = require('./Tile');
const DOMParser = require('xmldom').DOMParser;
const xmlToJSON = require('xmlToJSON');

xmlToJSON.stringToXML = function (string) {
  return new DOMParser().parseFromString(string, 'text/xml');
};

class Tiles {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.tiles = [];
    let tile;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Tiles') {
        let index = _.findIndex(option.entrydata, (o) => {
          return o.input[0]._attr.optionStore._value == 'dataInput';
        });
        let dataXmlStr =  _.get(option, `entrydata[${index}].input[0]._text`);
        let inputDataSet = xmlToJSON.parseString(dataXmlStr).data[0].dataPage;
        _.each(inputDataSet, (inputData) => {
          tile = new Tile(inputData);
          this.tiles.push(tile);
        });
      }
    });
  }

  getFormData () {
    return _.map(this.tiles, (tile) => ({
      feedback: tile.getFeedback(),
      category: tile.getCategory(),
      points: tile.getPoints(),
      questionStem: tile.getQuestionStem(),
      choices: tile.getChoices()
    }));
  }

  toString() {
    return this.tiles.join('\n');
  }

}

module.exports = Tiles;
