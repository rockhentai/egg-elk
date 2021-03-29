'use strict';

const os = require('os');
const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');
const assert = require('assert');

const hostname = os.hostname();

describe('test/elk.test.js', () => {
  let app;
  before(async () => {
    app = mock.app({
      baseDir: 'apps/elk-test',
    });
    await app.ready();
    await sleep(1000);
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('basic log', async () => {

    let elkUploadCallTime = 0;
    let logCount = 0;

    const transport = app.logger.get('elk');

    mock(transport, 'upload', logs => {
      elkUploadCallTime += 1;
      logCount += logs.length;
      assert(logs[0].hostname === hostname);
    });

    await app.httpRequest()
      .get('/')
      .expect('hi, elk')
      .expect(200);

    await sleep(2000);

    assert(elkUploadCallTime === 1);
    assert(logCount === 2);
  });

  it('big log', async () => {
    let elkRealSendCallTime = 0;
    let logCount = 0;
    const transport = app.logger.get('elk');

    mock(transport, 'upload', logs => {
      logCount += logs.length;
    });

    mock(transport.tcpPool, 'send', () => {
      elkRealSendCallTime += 1;
    });

    await app.httpRequest()
      .get('/bigLog')
      .expect('done')
      .expect(200);

    await sleep(2000);

    assert(elkRealSendCallTime === 0);
    assert(logCount === 1);

  });
});
