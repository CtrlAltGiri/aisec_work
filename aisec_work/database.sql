drop database aiesec;

create database aiesec;

use aiesec;

create table user(
	id int(5) auto_increment not null primary key, 
	reg_no varchar(15) not null,
	uname varchar(20) UNIQUE not null,
	pass varchar(300) not null,
	clg varchar(10) not null,
	name varchar(30) not null,
	email varchar(30) not null,
	login boolean default 0,
	phno varchar(10) not null,
	time_slot int(1) not null
);

create table admin(
	uname varchar(20) not null,
	pass varchar(300) not null	
);

create table result(
	reg_no varchar(15) primary key,
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