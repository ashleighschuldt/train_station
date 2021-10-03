const async = require('async');

module.exports = {
    // notes - should probably move the string formatting for times into their own service functions.
    getTrainSchedules: (req, res) => {
        const db = req.app.get('db');
        db.schedules.getTrainSchedules({})
        .then( schedules => {
            res.status(200).send(schedules)
        })
        .catch(err => {
            res.status(400).send(err);
        });
    },
    addNewSchedule: async (req, res) => {
        const db = req.app.get('db');
        let name = req.query.name ? req.query.name : '';
        let arrival_time = req.query.arrival_time ? req.query.arrival_time : '';

        if (name === '' || arrival_time === ''){
            return res.status(400).send('Invalid Train Name or Arrival Times.');
        }
        //verify name is correct format
        let regex = /^[A-Za-z0-9]{1,4}/gm;
        if (!regex.test(name)){
            return res.status(400).send('Invalid Train Name');
        }

        // //verify train exists in db.
        db.schedules.getTrainIdByName({
            trainName: name
        }).then( train_id => {
            if (train_id.length === 0){
                return res.status(400).send('Train is not available at this station.');
            }
            train_id = train_id[0].id;

            let times = [];
            let arrival_times = arrival_time.split(',');

            arrival_times.map(time => {
                time = time.replace(':', '');
                if (time.length < 6){
                    time =  "0" + time;
                }

                let hours = time.substring(0,2);
                let minutes = time.substring(2,4);
                let meridiem = time.substring(4,6);
            
                if (meridiem === 'AM'){
                    times.push(hours+':'+minutes+':00');
                } else {
                    hours = parseInt(hours)+12;
                    times.push(hours+':'+minutes+':00');
                }
            });
            let inserted = 0;
            let errors = [];
            for (let i = 0; i < times.length; i++){
                db.schedules.AddTrainSchedule({
                    trainId: train_id,
                    arrivalTime: times[i]
                }).then(() => {
                    inserted = inserted++;
                })
                .catch(err => {
                    errors.push(err);
                });
            }
            if (errors.length > 0){
                return res.status(400).send('Errors');
            }
            return res.status(200).json(inserted);
        }).catch(err => {
            res.send(400).send(err);
        });
    },

    getNextTrains: async (req, res) => {
        //Needs a time value
        let time = req.query.time ? req.query.time : '';

        if (time === ''){
            return res.status(400).send('Please enter a time.');
        }

        time = time.replace(':', '');
        if (time.length < 6){
            time =  "0" + time;
        }

      
        let hours = time.substring(0,2);
        let minutes = time.substring(2,4);
        let meridiem = time.substring(4,6);
      
        if (meridiem === 'AM'){
            time = hours+minutes+'00';
        } else {
            hours = parseInt(hours)+12;
            hours = hours.toString();
            time = hours+minutes+'00';
        }

        const db = req.app.get('db');
        db.schedules.getTrainSchedules({})
        .then( schedules => {
            let next_trains = [];

            schedules.map(schedule => {
               if (schedule.arrival_time > time){
                   next_trains.push({arrival: schedule.arrival_time, train: schedule.name });
               }
            });
            let trains = [];
            for (let i = 0; i < next_trains.length; i++){
	            if (i < next_trains.length -1){
                    if (next_trains[i].arrival == next_trains[i++].arrival){
                        trains.push(next_trains[i-1]);
                        trains.push(next_trains[i]);
                    }
                }
            }

            if (trains.length >= 2){
                trains = trains.slice(0,2);
                trains.map(train => {
                    let hours = train.arrival.substring(0,2);
                    let minutes = train.arrival.substring(3,5);
                    let meridiem = ' AM';
                    if (hours > 12){
                        hours = hours - 12;
                        meridiem = ' PM';
                    }
                    train.arrival = hours+':'+minutes+meridiem;
                });
                return res.status(200).send(trains);
            } else if (trains.length == 0){
                //return the next time in the AM.
            } else {
                return res.status(200).send('No Time');
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
}