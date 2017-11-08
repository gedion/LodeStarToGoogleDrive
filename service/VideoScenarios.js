const _ = require('lodash');
const VideoScenario = require('./VideoScenario');
const DOMParser = require('xmldom').DOMParser;
const xmlToJSON = require('xmlToJSON');

xmlToJSON.stringToXML = function (string) {
  return new DOMParser().parseFromString(string, 'text/xml');
};

class VideoScenarios {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.videoScenarios = [];
    let videoScenario;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Video Scenario') {
        let index = _.findIndex(option.entrydata, (o) => {
          return o.input[0]._attr.optionStore._value == 'dataInput';
        });
        let dataXmlStr =  _.get(option, `entrydata[${index}].input[0]._text`);
        let inputDataSet = xmlToJSON.parseString(dataXmlStr).data[0].dataPage;
        _.each(inputDataSet, (inputData) => {
          videoScenario = new VideoScenario(inputData);
          this.videoScenarios.push(videoScenario);
        });
      }
    });
  }

  getFormData () {
    return _.map(this.videoScenarios, (videoScenario) => ({
      inputOption: videoScenario.getInputOption(),
      points: videoScenario.getPoints(),
      feedback: videoScenario.getFeedback(),
      url: videoScenario.getUrl(),
      startTime: videoScenario.getStartTime(),
      endTime: videoScenario.getEndTime()
    }));
  }

  toString() {
    return this.videoScenarios.join('\n');
  }

}

module.exports = VideoScenarios;
