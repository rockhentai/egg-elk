'use strict';

const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

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

  it('should GET /', async () => {
    await app.httpRequest()
      .get('/')
      .expect('hi, elk')
      .expect(200);

    await sleep(2000);
  });
});
