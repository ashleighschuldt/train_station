const { convert_time_to_number, convert_time_to_text, convert_text_to_time } = require('../services/time.services');

module.exports = {
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
                time = convert_text_to_time(time);
                times.push(time);
            });
            let inserted = 0;
            let errors = [];
            for (let i = 0; i < times.length; i++){
                db.schedules.AddTrainSchedule({
                    trainId: train_id,
                    arrivalTime: times[i]
                }).then(() => {
                    inserted = inserted+1;
                })
                .catch(err => {
                    errors.push(err);
                });
            }
            if (errors.length > 0){
                return res.status(400).send('Errors');
            }
            return res.status(200).send('OK');
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

        time = convert_time_to_number(time);

        const db = req.app.get('db');
        db.schedules.getTrainSchedules({})
        .then( schedules => {
            let next_trains = [];
            schedules.map(schedule => {
                let arrival_time = schedule.arrival_time.replace(/:/g, '');

                if (arrival_time > time){
                   next_trains.push({arrival: schedule.arrival_time, train: schedule.name });
               }
            });
            let trains = [];
            if (next_trains.length < 2){
                for (let i = 0; i < schedules.length - 1; i++){
                        if (schedules[i].arrival_time === schedules[i+1].arrival_time){
                            schedules[i].arrival_time = convert_time_to_text(schedules[i].arrival_time);
                            schedules[i+1].arrival_time = convert_time_to_text(schedules[i+1].arrival_time);
                            trains.push(schedules[i]);
                            trains.push(schedules[i+1]);
                        }
                        if (trains.length == 2){
                            return res.status(200).send(trains);
                        }
                    }
                    return res.status(200).send('No Time');
            } else {
                for (let i = 0; i < next_trains.length - 1; i++){
                        if (next_trains[i].arrival === next_trains[i+1].arrival){
                            next_trains[i].arrival = convert_time_to_text(next_trains[i].arrival);
                            next_trains[i+1].arrival = convert_time_to_text(next_trains[i+1].arrival);
                            trains.push(next_trains[i]);
                            trains.push(next_trains[i+1]);
                        }
                }
                if (trains.length >= 2){
                    trains = trains.slice(0,2);
                }
                return res.status(200).send(trains);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
}