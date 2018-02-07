const GenericPool = require("generic-pool");
const Driver = require('./connection');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const appiumController = require('./appium-manager')

const factory = {
  currentPort: 4722, 
  create: async function() {
    const port = this.currentPort;
    this.currentPort++;
    await appiumController.startAppium({
        port,
      });
    console.log('CREATED on port', port);
    return {
      ... await Driver.initializeConnection(port),
      port,
    };
  },
  destroy: async function(driver) {
    console.log('Destroying driver...');
    await driver.closeConnection();
    return appiumController.stopAppium({
        port: driver.port,
      }
    );
  },
  min: function() {
    return 2;
  },
  max: function() {
    return 2;
  },
};

const opts = {
  max: factory.max(),
  min: factory.min()
};

const driverPool = GenericPool.createPool(factory, opts);

module.exports = driverPool;
 