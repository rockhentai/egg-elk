'use strict';

const net = require('net');
const EventEmitter = require('events');

const DEFAULT_MAX_TCP_CONNECTIONS = 300;

class TcpConnectionWrapper extends EventEmitter {
  constructor(host, port, config) {
    super();

    this.connectionNotReadyRetryInterval = parseInt(
      config.retryInterval || 500
    );

    this.connectionTimeout = parseInt(config.timeout || 5000);

    const self = this;

    this.connection = net.connect(
      {
        host,
        port,
      },
      function() {
        self.connected = true;
      }
    );

    this.connection.setTimeout(this.connectionTimeout);

    this.connection.on('timeout', () => {
      console.log('timeout');
      self.destroy();
    });

    this.connection.on('close', () => {
      self.destroy();
    });

    this.connection.on('error', err => {
      console.error(
        `Egg-ELK Error with the connection to ${host}:${port}. ${err}`
      );
    });
  }

  send(logObject) {
    const message = (obj => {
      if (typeof obj === 'string') {
        return obj;
      }
      return JSON.stringify(obj) + '\n';
    })(logObject);

    this.realSend(message);
  }

  realSend(message) {
    const self = this;

    if (this.connected === true) {
      this.connection.write(message, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      });
    } else {
      const timeout = setTimeout(() => {
        self.realSend(message);
        clearTimeout(timeout);
      }, this.connectionNotReadyRetryInterval);
    }
  }

  destroy() {
    this.connection.end();
    this.connection.destroy();

    this.emit('destroy');
  }
}

class TcpConnectionPool {
  constructor(host, port, config) {
    this.tcpConnections = {};
    this.host = host;
    this.port = port;

    if (config) {
      this.config = config;
    } else {
      this.config = {};
    }

    if (!this.config.maxConnections) {
      this.config.maxConnections = DEFAULT_MAX_TCP_CONNECTIONS;
    }
  }

  send(logObject) {
    this._getTcpConnection().send(logObject);
  }

  _getTcpConnection() {
    const index = this._createIndexForTcpConnection();
    return (
      this.tcpConnections[index] || this._createTcpConnection(index, this.host, this.port)
    );
  }

  _createTcpConnection(index, host, port) {
    const self = this;
    const tcpConnectionWrapper = new TcpConnectionWrapper(
      host,
      port,
      this.config
    );
    this.tcpConnections[index] = tcpConnectionWrapper;

    tcpConnectionWrapper.on('destroy', () => {
      delete self.tcpConnections[index];
    });

    return tcpConnectionWrapper;
  }

  _createIndexForTcpConnection() {
    return (
      Math.floor(Math.random() * this.config.maxConnections) %
      this.config.maxConnections
    );
  }
}

module.exports.TcpConnectionPool = TcpConnectionPool;
