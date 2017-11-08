const _ = require("lodash");
const Choices = require("./Choices.js");
const striptags = require('striptags');

class VideoScenario {

  constructor (options = {}) {
   this.options = options;
/*
 *
 * start time end time
 */
    this.setInputOption();
    this.setPoints();
    this.setFeedback();
    this.setUrl();
    this.setStartTime();
    this.setEndTime();
  }

  getUrl () {
    this.setUrl();
    return this.url;
  }

  getFeedback () {
    this.setFeedback();
    return this.feedback;
  }

  getPoints () {
    this.setPoints();
    return this.points;
  }

  getInputOption () {
    this.setInputOption();
    return this.inputOption;
  }

  getStartTime() {
    this.setStartTime();
    return this.startTime;
  }

  getEndTime() {
    this.setEndTime();
    return this.endTime;
  }

 setInputOption (inputOption = null) {
    this.inputOption = inputOption;
    if (_.isEmpty(this.inputOption)) {
      try {
        this.inputOption =  _.get(this.options, `Option[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario inputOption: ${error}`);
      }
    }
 }

 setPoints (points = null) {
    this.points = points;
    if (_.isEmpty(this.points)) {
      try {
        this.points =  _.get(this.options, `Points[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario points : ${error}`);
      }
    }
 }

 setFeedback (feedback = null) {
    this.feedback = feedback;
    if (_.isEmpty(this.feedback)) {
      try {
        this.feedback = _.get(this.options, `Feedback[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario feedback: ${error}`);
      }
    }
 }

 setUrl (url = null) {
    this.url = url;
    if (_.isEmpty(this.url)) {
      try {
        this.url = _.get(this.options, `URL[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario URL: ${error}`);
      }
    }
 }

 setStartTime (startTime = null) {
    this.startTime = startTime ;
    if (_.isEmpty(this.startTime)) {
      try {
        this.startTime = _.get(this.options, `Start_Time[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario URL: ${error}`);
      }
    }
 }
 setEndTime (endTime = null) {
    this.endTime = endTime;
    if (_.isEmpty(this.endTime)) {
      try {
        this.endTime = _.get(this.options, `End_Time[0]._text`);
      } catch(error) {
        console.log(`Error setting VideoScenario URL: ${error}`);
      }
    }
 }
  toString() {
    return `
      ${super.toString()},
      inputOption: ${this.inputOption},
      points: ${this.points}
      feedback: ${this.feedback},
      url: ${this.url},
      startTime: ${this.startTime}
      endTime: ${this.endTime}
    `;
  }


}

module.exports = VideoScenario;
