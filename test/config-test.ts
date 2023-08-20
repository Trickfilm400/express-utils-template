import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { Config, dbConfig } from '@kopf02/express-utils';
import { CustomConvictConfig } from '../src/config/interface';

describe('Convict Config', () => {
  before('create test config file', () => {
    process.env.NODE_ENV = 'test';
    fs.writeFileSync(
      path.join(__dirname, '..', 'test.json'),
      JSON.stringify({ port: 1234, db: { port: 27017 } }, null, 4)
    );
    new Config(dbConfig('mysql', 'test'));
    Config.getConfig<CustomConvictConfig>().set('env', 'test');
    Config.getConfig<CustomConvictConfig>().set('loglevel', 'silly');
    //console.log(Config.getConfig<CustomConvictConfig>(), __dirname);
  });

  it('should fetch correct defaults', () => {
    assert.strictEqual(
      Config.getConfig<CustomConvictConfig>().get('db.host'),
      'localhost'
    );
  });

  it('should fetch correct values from config file', () => {
    assert.strictEqual(
      Config.getConfig<CustomConvictConfig>().get('port'),
      1234
    );
  });

  it('should fetch correct values from env file', () => {
    assert.strictEqual(
      Config.getConfig<CustomConvictConfig>().get('loglevel'),
      'silly'
    );
  });

  after('delete test-config.json file', () => {
    fs.rmSync(path.join(__dirname, '..', 'test.json'));
  });
});
