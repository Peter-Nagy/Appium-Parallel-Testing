const wd = require('wd');
const { _ } = require('underscore');
const logger = require('./logging');
const caps = require('./caps');

const localServer = require('./localServer');
const serverConfigs = require('./appium-servers');

class Connection {
  async initializeConnection(port) {
    await localServer.start();
    const serverConfig = {
      host: 'localhost',
      port,
    };
    this.driver = wd.promiseChainRemote(serverConfig);
    logger.configure(this.driver);

    let desired;

    if(process.env.PLATFORM === 'ios') {
      desired = _.clone(caps.ios);
      desired.app = 'http://127.0.0.1:4000/app.zip';
    } else {
      desired = _.clone(caps.android);
      desired.app = 'http://127.0.0.1:4000/app.apk';
    }
    return this.driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  }

  async closeConnection() {
    localServer.stop();
    return this.driver.quit();
  }
}

const connection = new Proxy(new Connection(), {
  get(target, property) {
    return target[property] !== undefined ? target[property] : target.driver[property];
  },
});

module.exports = connection;
