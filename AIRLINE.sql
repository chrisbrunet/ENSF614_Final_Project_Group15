DROP DATABASE IF EXISTS AIRLINE;
CREATE DATABASE AIRLINE; 
USE AIRLINE;


DROP TABLE IF EXISTS STUDIO;
CREATE TABLE STUDIO (
	Name			varchar(25) not null,
	Phone			char(12),
	Address			varchar(25),
	primary key (Name)
);

INSERT INTO STUDIO (Name, Phone, Address)
VALUES
('Music Mastery',	'403-357-4457',	'25 Heron Way NW'),
('Melody Time',	'587-594-7593',	'124 Watford Rise SE'),
('Harmony Inc.',	'403-954-5232',	'68 Cedar Drive NE');
