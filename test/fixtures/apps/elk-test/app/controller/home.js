'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    this.ctx.logger.info('hello bitch');
    this.ctx.logger.warn('warn bitch');

    this.ctx.body = 'hi, ' + this.app.plugins.elk.name;
  }
}

module.exports = HomeController;
