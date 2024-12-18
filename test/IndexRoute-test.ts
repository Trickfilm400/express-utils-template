import * as chai from 'chai';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import chaiHttp = require('chai-http');

import { App } from '@kopf02/express-utils';
import { router } from '../src/routes';

describe('IndexRoute', () => {
  let app: App;

  before(() => {
    process.env.NODE_ENV = 'test';
    //register plugin
    chai.use(chaiHttp);
    app = new App(router);
    app.init();
  });
  it('should get empty data on / request', () => {
    return chai
      .request(app.getServer())
      .get('/')
      .then((res) => {
        chai.expect(res.body).to.deep.equal({ data: null });
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get api version', (done) => {
    chai
      .request(app.getServer())
      .get('/version')
      .then((res) => {
        //console.log(res);
        chai.expect(res.body).to.deep.equal({ data: { version: 'v0.0.1' } });
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get healthcheck', () => {
    return chai
      .request(app.getServer())
      .get('/health')
      .then((res) => {
        chai.expect(res.body.data.date).to.be.a('number');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        chai.expect(res.body.data.healthy).to.be.true;
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get 404', () => {
    return chai
      .request(app.getServer())
      .get('/path-does-not-exist')
      .then((res) => {
        chai.expect(res.body).to.deep.equal({ error: 'Page not found' });
        chai.expect(res).to.have.status(404);
      })
      .catch((err) => {
        throw err;
      });
  });
});
