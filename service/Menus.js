const _ = require('lodash');
const Menu = require('./Menu');

class Menus {

  constructor (config) {
    this.config = config;
    let options = _.get(config, 'interactions[0].interaction[0].parameters[0].cparameter[0].optionpage');
    this.menus = [];
    let menu;
    _.each(options, (option) => {
      if (_.get(option, 'entrydata[0].input[0]._text') == 'Menu') {
        menu = new Menu(option);
        this.menus.push(menu);
      }
    });
  }

  getFormData () {
    return _.map(this.menus, (menu) => ({
      type: menu.getType(),
      title: menu.getTitle(),
      instruction: menu.getInstructions(),
      choices: menu.getChoices().getFormData()
    }));
  }

  toString() {
    return this.menus.join('\n');
  }

}

module.exports = Menus;
