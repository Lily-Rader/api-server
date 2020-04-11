// Library imports
const express = require('express');
const compress = require('compression');

// Local imports
const librariesUtil = require('./utils/libraries');

// Routes imports
const librariesRoutes = require('./routes/libraries');
const tutorialsRoutes = require('./routes/tutorials');
const libraryRoutes = require('./routes/library');
const errorsRoutes = require('./routes/errors');

// App constants
const port = Number(process.env.PORT || 5050);
const args = process.argv.slice(2);

// Local mode state
let localMode = false;
if (process.env.LOCAL === 'true' || (args.length > 0 && (args[0] === '--local' || args[2] === '--local'))) {
    console.log('local mode: on, gc() and Public-Key-Pins headers disabled!');
    localMode = true;
} else {
    console.log('local mode: off');
}

// Garbage collection
if (!localMode && (typeof global.gc !== 'undefined')) {
    global.gc();
}

module.exports = () => {
    // Basic app configuration
    const app = express();
    app.disable('x-powered-by');

    // Load the library data
    librariesUtil.set(app);

    // Set all the relevant headers for the app
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        if (!localMode) {
            res.setHeader('Public-Key-Pins', 'pin-sha256="EULHwYvGhknyznoBvyvgbidiBH3JX3eFHHlIO3YK8Ek=";pin-sha256="x9SZw6TwIqfmvrLZ/kz1o0Ossjmn728BnBKpUFqGNVM=";max-age=3456000;report-uri="https://cdnjs.report-uri.io/r/default/hpkp/enforce"');
        }
        next();
    });

    // Always compress whatever we return
    app.use(compress());

    // Setup our routes
    librariesRoutes(app);
    tutorialsRoutes(app);
    libraryRoutes(app);
    errorsRoutes(app);

    // START!
    app.listen(port, () => {
        console.log('Listening on ' + (localMode ? 'http://0.0.0.0:' : '') + port);
    });
}