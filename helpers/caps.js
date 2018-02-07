exports.android = {
  browserName: '',
  'appium-version': '1.4.10',
  platformName: 'Android',
  //platformVersion: '8.0',
  avd: 'Nexus_5X_API_26_x86',
  deviceName: 'kecske',
  app: undefined, // will be set later
};

exports.ios = {
  platformName: 'iOS',
  platformVersion: '11.2',
  deviceName: 'iPhone 8 Plus',
  useNewWDA: true,
  showXcodeLog: true,
  autoAcceptAlerts: true,
}
