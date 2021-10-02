# train_station

Purpose of this repo is to create a REST API using Node/Express.

## Endpoints:
# /get_train_schedules
  *This endpoint gets all the available train schedules.
# /add_new_schedule
  -*This POST request allows a client to add a list of schedules.
  -Params: name, arrival_time
  -name is an alphanumeric string up to 4 characters long.
  -arrival time is a comma separated list (i.e. 8:00AM,9:53PM, 10:00PM).
# /get_next_trains
  -*This is a post request that allows a client to get the next two trains that will be in the station simultaniously, after the time requested.
  -Params: time
  -time is a string, needs to be formatted as follows (8:00AM).
