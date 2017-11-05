const _ = require('lodash');
const Category = require('./Category');

class Categories {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.categories = [];
    let category;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Categories') {
        category = new Category(option);
        this.categories.push(category);
    }
    });
  }

  getFormData () {
    return _.map(this.categories, (category) => ({
      type: category.getType(),
      title: category.getTitle(),
      points: category.getTotalPoints(),
      columnsLeft: category.getColumnLeft(),
      columnsRight: category.getColumnRight(),
      rowsLeft: category.getChoicesLeft().getFormData(),
      rowsRight: category.getChoicesRight().getFormData()
    }));
  }

  toString() {
    return this.categories.join('\n');
  }
}

module.exports = Categories;
