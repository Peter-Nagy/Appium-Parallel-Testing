let childProcess = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    os = require('os'),
    shell = require('shelljs');

const startAppium = async (options) => {
    options = options || {};

    let host = options.host !== undefined ? options.host : 'localhost',
        port = options.port !== undefined ? options.port : '4723',
        shutdown = options.shutdown !== undefined ? options.shutdown : true,
        logDir = options.logDir !== undefined ? options.logDir : 'logs',
        defaultCapabilities = options.defaultCapabilities,
        appiumOptions = ['-a', host, '-p', port],
        platform = os.platform(),
        command = 'appium.cmd';

    if (shutdown)
        stopAppium({port: port});

    if (platform.indexOf('darwin') > -1 ||
        platform.indexOf('linux') > -1) {
        command = 'appium';
    }

    if (defaultCapabilities)
        appiumOptions.push('--default-capabilities', defaultCapabilities);

    console.log('Starting appium...');

    if (!fs.existsSync(logDir))
        fs.mkdirSync(logDir);

    let out = fs.openSync(path.join(logDir, 'appium'), 'w');
    let er = fs.openSync(path.join(logDir, 'appium-error'), 'w');

    let child = await childProcess.spawn(
        command,
        appiumOptions,
        {
            detached: true,
            stdio: ['ignore', out, er]
        }
    ).on('error', (err) => { throw err });

    return statusCheck(host, port, child, 0)
};

const statusCheck = (host, port, child, statusCode,
    wdPath = '/wd/hub/status', maxRetries = 80) => {

    return new Promise((resolve, reject) => {
        let retries = 0;
        const interval = 100;

        function handleError() {
            const error = new Error('Connection was refused after ' + retries + ' attempts.');
            error.name = 'PATH_CHECK_TIMED_OUT';
            reject(error);
        }

        (function handleInterval() {
            return http.get(`http://${host}:${port}${wdPath}`
            , (res, a) => {
                if (retries > maxRetries) {
                    return handleError();
                }
                if (res.statusCode !== 200) {
                    setTimeout(handleInterval, interval);
                } else {
                    console.log('appium is running on ' + host + ':' + port + '!');
                    child.unref();
                    resolve();
                }
            }).on('error', (err) => {
                if (retries > maxRetries) {
                    return handleError();
                }
                setTimeout(handleInterval, interval);
            });;
        })();
    })
};

const stopAppium = (options) => {

    options = options || {};

    let platform = os.platform(),
        msg = 'appium is shutdown',
        port = options.port !== undefined ? options.port : '4723';

    if (platform.indexOf('darwin') > - 1 ||
        platform.indexOf('linux') > -1) {
        shell.exec('pkill -f appium');
        console.log(msg)
    } else {
        shell.exec('for /f "tokens=5" %p in (\'netstat -a -o -n ^| ' +
            'findstr "LISTENING" ^| ' +
            'findstr ":' + port + '"\') do ( taskkill -F -PID %p )');
        console.log(msg)
    }
};

module.exports = {
    startAppium,
    stopAppium,
};
