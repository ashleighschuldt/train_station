insert into arrival_times (train_id, arrival_time)
values ((select id from trains where name = $1), $2);
