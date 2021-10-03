# train_station

Purpose of this repo is to create an API using Node/Express. Premise is that this API is for a particular train station. You can get the train schedules and add a list of schedules to a train.

## Endpoints:
- [GET /get_train_schedules] 
- [POST /add_new_schedule ]
- [GET /get_next_trains ]

### GET /get_train_schedules
-This endpoint returns all the available train schedules.
Example: http://localhost:8000/get_train_schedules

Response Example:
[
    {
        "arrival_time": "08:00:00",
        "name": "Thomas"
    },
    {
        "arrival_time": "09:00:00",
        "name": "Henry"
    },
    {
        "arrival_time": "09:00:00",
        "name": "Thomas"
    },
    {
        "arrival_time": "10:00:00",
        "name": "Thomas"
    },
    {
        "arrival_time": "21:53:00",
        "name": "Henry"
    },
    {
        "arrival_time": "22:00:00",
        "name": "Henry"
    },
    {
        "arrival_time": "22:00:00",
        "name": "Thomas"
    }
]

### POST /add_new_schedule
-This request allows a client to add a list of schedules for a specific train line.

Example: http://localhost:8000/add_new_schedule?name=test&arrival_time=11:50PM,11:51PM

Query Params:
#### name
-name of the train line
-must be an alphanumeric string with a maximum of 4 characters.
#### arrival_time
- arrival time is the schedule a client wants to add to the train line.
- use a comma seperated string for multiple times (i.e. 8:00AM,9:00AM,10:00PM)

Returns 200 response on success and 400, 500 etc on errors.

### GET /get_next_trains
-This request allows a client to pass a time and get the next 2 trains that will be in the station simultaneously. If there are none available in the current day, it will return the next available time the following day. If no trains are available in the station it will return "No time"

Example: 
http://localhost:8080/get_next_trains?time=11:58PM

Query Params:
#### time
-time to get trains after
- string (i.e. 9:53PM)

Response Example:

[
    {
        "arrival_time": "09:00:00",
        "name": "test"
    },
    {
        "arrival_time": "09:00:00",
        "name": "tomo"
    }
]
