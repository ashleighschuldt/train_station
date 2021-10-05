const massive = require('massive');
require('dotenv').config();

massive(process.env.DATABASE_URL)
    .then(db => db.store.fetch('test'))
    .then(result => {
        let arrival_times = [];
        result.map(values => {
            arrival_times.push(values.arrival_time);
        });
        console.log(arrival_times)
    }).catch(err => console.log(err));