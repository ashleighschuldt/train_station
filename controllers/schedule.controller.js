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

        //verify name and arrival time exist
        if (!name || !arrival_time){
            return res.status(400).send('Invalid Station Name or arrival times.');
        }
        //verify name is correct format
        let regex = /^[A-Za-z0-9]{1,4}/gm;
        if (!regex.test(name)){
            return res.status(400).send('Invalid Station Name');
        }
        
        //verify station exists in db.
        try {
            await db.stations.findOne({
                name: name
            }).then( station_id => {
                
            })
        } catch(err){
            res.status(400).send(err);
        };

        let times = [];
        let arrival_times = arrival_time.split(',');

        arrival_times.map(time => {
  
            time = time.replace(':', '');
            
            if (time.length < 6){
                time = '0'.concat(time);
            }
          
            let hours = time.substring(0,2);
            let minutes = time.substring(2,4);
            let meridiem = time.substring(4,6);
          
            if (meridiem === 'AM'){
                times.push(hours+':'+minutes+':00');
            } else {
                hours = Number(hours)+12;
                times.push(hours+':'+minutes+':00');
            }
        });

        let arrival_times_by_id = [];
        let errors = [];
        for (let i = 0; i < times.length; i++){
            try {
                await db.arrival_times.insert({
                    station_id: id,
                    arrival_time: times[i]
                })
                .then( inserted => {
                    arrival_times_by_id.push(inserted);
                })
            } catch(err){
                res.status(400).send(err);
            };
        }
        if (errors.length > 0){
            return res.status(400).send('Errors');
        }
        return res.status(200).send(arrival_times_by_id);
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
	            if (next_trains[i].arrival == next_trains[i++].arrival){
    	            trains.push(next_trains[i]);
    	            trains.push(next_trains[i++]);
                }
            }

            if (trains.length >= 2){
                trains = trains.slice(0,2);
                // Need to format the time back to HH:MM AM/PM
                return res.status(200).send(trains);
            } else if (trains.length == 0){

            } else {
                return res.status(200).send('No Time');
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
}