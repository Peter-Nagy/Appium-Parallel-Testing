const iosElements = {
    leftTextField: 'leftTextField',
    rightTextField: 'rightTextField',
    addButton: 'addButton',
    resultLabel: 'resultLabel',
};

const androidElements = {
    leftTextField: 'leftEditText',
    rightTextField: 'rightEditText',
    addButton: 'addButton',
    resultLabel: 'resultLabel',
};

module.exports = process.env.PLATFORM === 'ios' ? iosElements : androidElements;
