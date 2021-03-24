# egg-elk

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-elk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-elk
[travis-image]: https://img.shields.io/travis/eggjs/egg-elk.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-elk
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-elk.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-elk?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-elk.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-elk
[snyk-image]: https://snyk.io/test/npm/egg-elk/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-elk
[download-image]: https://img.shields.io/npm/dm/egg-elk.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-elk

<!--
Description here.
-->

## Description

egg elk log plugin

## Install

```bash
$ npm i egg-elk --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.elk = {
  enable: true,
  package: 'egg-elk',
};
```

## Configuration

```ts
type CategoryTypes = 'logger' | 'errorLogger' | 'coreLogger' | 'scheduleLogger';

interface ELKConfig {
  host: string;
  port: number;
  logType?: string;
  categories?: CategoryTypes[];
  tcp?: {
    maxConnections: number;
    retryInterval: number;
    timeout: number;
  };
  fields?: {
    [key: string]: string;
  };
}
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| host | elk host | string | - |
| port | elk port | number | - |
| logType | type of your log | string | - |
| categories | - | CategoryTypes[] | `['logger']` |
| tcp | tcp config | - | `{ maxConnections: 300, retryInterval: 500, timeout: 5000 }` |
| fields | custom tags | `{ [key: string]: string; }` | - |

```js
// {app_root}/config/config.default.js
exports.elk = {
  host: '127.0.0.1',
  port: 80,
  logType: 'eggElkLogType',
  fields: {
    tag: 'kurt',
  },
  categories: [ 'logger' ],
  tcp: {
    maxConnections: 300,
    retryInterval: 500,
    timeout: 5000,
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
