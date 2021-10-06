-- Included to demonstrate db schema
create table arrival_times (
	id serial primary key,
	train_id int,
	foreign key (train_id) references trains(id),
	arrival_time varchar(8)
	);
