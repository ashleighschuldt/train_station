const express = require('express');
const router = express.Router();

router.get('/get_train_schedules', (req, res) => {
    res.send('GET request');
});

router.post('/add_new_schedule', (req, res) => {
    //params:
    // up to 4 digit name of train line
    // list of times when train arrives (9:53 PM)
    res.send('POST request');
});

router.post('/get_next_trains', (req, res) => {
    //params - time value
    //get next time multiple trains will arrive at the same minute after param.
    //assume all trains have same schedule every day
    //if no remaining, should return next time multiples are available.
    //if no instances, return no time.
});
module.exports = router;