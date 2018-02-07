const driver = require('./connection');

const withDriver = func => () => {
  beforeEach(async () => {
    await driver.resetApp();
  });
  before(async () => driver.initializeConnection());
  after(async () => driver.closeConnection());
  func(driver);
};

module.exports = withDriver;
