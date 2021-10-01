-- Included to demonstrate db schema
create table arrival_times (
	id serial primary key,
	station_id int,
	foreign key (station_id) references stations(id),
	arrival_time varchar(8)
	);
