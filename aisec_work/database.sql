create database aiesec;

use aisec;

create table login(
	reg_no varchar(15) not null,
	uname varchar(20) not null,
	pass varchar(20) not null,
	clg varchar(10) not null,
	name varchar(30) not null,
	email varchar(30) not null,
	login boolean default 0,
	name varchar()
	)