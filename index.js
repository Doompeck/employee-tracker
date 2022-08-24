const db = require('./db/connect');
const databaseInit = require('./utils/databaseInit');

db.connect(err => {
    if (err) throw err;
    setTimeout(() => {
        console.log("Hey There");
        // databaseInit();
    }, 1000);
});