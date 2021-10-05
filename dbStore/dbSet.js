const massive = require('massive');
require('dotenv').config();

massive(process.env.DATABASE_URL)
    .then(db => db.store.set('test', '3:00:00'))
    .then(result => console.log(result))
    .catch(err => console.log(err));