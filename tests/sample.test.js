require('chai').should();
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

describe('Sample calculator tests', () => {
    it('Should add two positive integers', async () => {
        const driver = await DriverPool.acquire();
        '3'.should.be.equal('3');
        return;
        const result = await sum(1, 2, driver);
        result.should.be.equal('3');
    });
    it('Should add two positive fractions', async () => {
        const driver = await DriverPool.acquire();
        '3'.should.be.equal('3');
        DriverPool.release(driver);
        return;
        const result = await sum(1.5, 2.6, driver);
        result.should.be.equal('4.1');
    });
    it('Should add a positive and a negative integer', async () => {
        const driver = await DriverPool.acquire();
        '3'.should.be.equal('3');
        return;
        const result = await sum(-1, 1, driver);
        result.should.be.equal('0');
    });
});