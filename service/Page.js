const _ = require("lodash");

class Page {

  constructor (options = {}) {
    this._options = options;
    this.type = _.get(options, 'entrydata[0].input[0]._text') || 'Page';
    this.setTitle();
    this.setTotalPoints();
  }

  getType () {
    return this.type;
  }

  getTotalPoints () {
    this.setTotalPoints();
    return this.totalPoints;
  }

  getTitle () {
    this.setTitle();
    return this.title;
  }

  setTitle (title = null) {
    this.title = title;
    if (_.isEmpty(this.title)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'Title';
        });
        this.title =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card title: ${error}`);
      }
    }
  }

  setTotalPoints (totalPoints = null) {
    this.totalPoints= totalPoints;
    if (_.isEmpty(this.totalPoints)) {
      try {
        let index = _.findIndex(this._options.entrydata, (o) => {
         return o.input[0]._attr.optionStore._value == 'TotalPoints';
        });
        this.totalPoints =  _.get(this._options, `entrydata[${index}].input[0]._text`);
      } catch(error) {
        console.log(`Error setting card totalPoints : ${error}`);
      }
    }
  }

  toString() {
    return `
      title: ${this.title},
      totalPoints: ${this.totalPoints},
    `;
  }
}

module.exports = Page;
