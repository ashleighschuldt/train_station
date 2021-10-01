const express = require('express');
const massive = require('massive');
const cors = require('cors');
const app = express();
const path = require('path');
//using to sanitize inputs for sql queries to avoid sql injection.
const { query } = require('express-validator');
const ScheduleController = require('./controllers/schedule.controller');

require('dotenv').config();
app.use(express.json());
app.use(cors());


massive(process.env.DATABASE_URL).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('db is running.');
})
.catch(err => {
    console.error(`Failed to connect: ${err}`);
});

app.use(express.static(path.join(__dirname, './build')))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

// End Points - normally these would be broken out in their own routes file.

app.get('/get_train_schedules', ScheduleController.getTrainSchedules);
app.post(`/add_new_schedule`, 
    // query('name').not().isEmpty().trim().escape(),
    // query('arrival_time').not().isEmpty().trim().escape(),
        ScheduleController.addNewSchedule);

app.post('/get_next_trains', (req, res) => {
    //params - time value
    //get next time multiple trains will arrive at the same minute after param.
    //assume all trains have same schedule every day
    //if no remaining, should return next time multiples are available.
    //if no instances, return no time.
    res.send('get next trains');
});