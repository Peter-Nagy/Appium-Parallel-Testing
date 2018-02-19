const test = require('ava');
const DriverPool = require('../helpers/pool');
const elements = require('../helpers/elements');

const sum = async (number1, number2, driver) => {
    const leftTextField = await driver.waitForElementById(elements.leftTextField);
    const rightTextField = await driver.waitForElementById(elements.rightTextField);
    await leftTextField.type(number1);
    await rightTextField.type(number2);

    const sumButton = await driver.waitForElementById(elements.addButton);
    await sumButton.click();

    const resultLabel = await driver.waitForElementById(elements.resultLabel);
    return resultLabel.text();
};

test.beforeEach(async t => {
    t.driver = await DriverPool.acquire();
});

test.afterEach(async t => {
    await DriverPool.release(t.driver);
});

test(async t => {
    const { driver } = t;
    const result = await sum(1, 2, driver);
    t.is(result, '3');
});

test(async t => {
    const { driver } = t;
    const result = await sum(1.5, 2.6, driver);
    t.is(result, '4.1');
});

test(async t => {
    const { driver } = t;
    const result = await sum(-1, 1, driver);
    t.is(result, '0');
});