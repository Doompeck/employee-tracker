const databaseInit = require('./utils/databaseInit');
const db = require('./db/connect');

db.connect(err => {
    if (err) throw err;
    setTimeout(() => {
        databaseInit();
    }, 1000);
});