'use strict';

/**
 * egg-elk default config
 * @member Config#elk
 * @property {String} SOME_KEY - some description
 */
exports.elk = {
  categories: [ 'logger' ],
  tcp: {
    maxConnections: 300,
    retryInterval: 500,
    timeout: 5000,
  },
};
