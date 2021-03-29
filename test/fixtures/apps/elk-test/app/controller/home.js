'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class HomeController extends Controller {
  async index() {

    this.ctx.logger.info('hello bitch');
    this.ctx.logger.warn('warn bitch');

    this.ctx.body = 'hi, ' + this.app.plugins.elk.name;
  }

  async bigLog() {
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024).toString('hex'));
    this.ctx.body = 'done';
  }

}

module.exports = HomeController;
