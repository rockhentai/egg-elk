'use strict';

// const assert = require('assert');
const ELKTransport = require('./lib/elk_transport');

module.exports = app => {
  const { categories = [ 'logger' ], ...rest } = app.config.elk;

  for (const [ name, logger ] of app.loggers.entries()) {
    if (!categories.includes(name)) continue;
    const transport = new ELKTransport({
      ...rest,
      level: logger.options.level,
    });
    logger.set('elk', transport);
  }
};
