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
    addNewSchedule: (req, res) => {
        const db = req.app.get('db');
        let name = req.query.name ? req.query.name : '';
        let arrival_time = req.query.arrival_time ? req.query.arrival_time : '';

        //verify name and arrival time exist
        if (!name || !arrival_time){
            return res.status(400).send('Invalid Station Name or arrival times.');
        }
        //verify name is correct format
        let regex = /^[A-Za-z0-9]{1,4}/;
        if (regex.test(name)){
            return res.status(400).send('Invalid Station Name');
        }
        
        //verify station exists in db.
       const id = '';
       const station_id = db.stations.findOne({
           name: name
       })
        .then( station_id => {
           id = station_id;
        })
        .catch(err => {
            res.status(400).send(err);
        });

        //Need to format comma separated string of times.
        //loop through to isert into db.

        


        // db.schedules.addNewSchedule([
        //     station_id,
        //     arrival_time
        // ]);
        //  return res.status(200).send('success');
    }

}