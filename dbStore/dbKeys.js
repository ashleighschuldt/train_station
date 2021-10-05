const massive = require('massive');
require('dotenv').config();

massive(process.env.DATABASE_URL)
    .then(db => db.store.keys())
    .then(result => {
        let dbKeys = [];
        result.map(name => {
            dbKeys.push(name.name);
        });
        console.log(dbKeys)
    }).catch(err => console.log(err));