create database aiesec;

use aiesec;

create table login(
	id int(5) auto_increment not null primary key, 
	reg_no varchar(15) not null,
	uname varchar(20) not null,
	pass varchar(20) not null,
	clg varchar(10) not null,
	name varchar(30) not null,
	email varchar(30) not null,
	login boolean default 0,
	phno varchar(10) not null,
	time_slot int(1) not null
);

create table admin(
	uname varchar(20) not null,
	pass varchar(20) not null	
);

create table result(
	login_id int(5) primary key,
	q1 varchar(30),
	q2 varchar(30),
	q3 varchar(30),
	q4 varchar(30),
	q5 varchar(30),
	q6 varchar(30),
	q7 varchar(30),
	q8 varchar(30),
	q9 varchar(30),
	q10 varchar(30),
	essay1 mediumtext,
	essay2 mediumtext,
	essay3 mediumtext
);