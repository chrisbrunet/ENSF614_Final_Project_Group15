DROP DATABASE IF EXISTS AIRLINE;
CREATE DATABASE AIRLINE; 
USE AIRLINE;


DROP TABLE IF EXISTS CREW;
CREATE TABLE CREW (
	crewID	varchar(1) not null,
	primary key (crewID)
);

INSERT INTO CREW (crewID)
VALUES
('A'), ('B'), ('C'), ('D'), ('E'), ('F');

DROP TABLE IF EXISTS AIRCRAFT;
CREATE TABLE AIRCRAFT (
	aircraftID int not null auto_increment,
    crewID varchar(1) not null,
    aircraftType varchar(10) not null,
	primary key (aircraftID), 
    foreign key (crewID) references CREW(crewID)
);

INSERT INTO AIRCRAFT (crewID, aircraftType)
VALUES
('A', '737'), 
('B', '737'), 
('C', '787'), 
('D', '787'), 
('E', '747'), 
('F', 'F-16');

DROP TABLE IF EXISTS FLIGHT;
CREATE TABLE FLIGHT (
	flightID int not null auto_increment,
    aircraftID int not null,
    departCity varchar(20) not null,
	arriveCity varchar(20) not null,
    flightDate date not null,
	primary key (flightID), 
    foreign key (aircraftID) references AIRCRAFT(aircraftID)
);

INSERT INTO FLIGHT (aircraftID, departCity, arriveCity, flightDate)
VALUES
(1, 'Calgary', 'Toronto', '2023-12-05'), 
(2, 'Toronto', 'Calgary', '2023-12-05'), 
(3, 'Calgary', 'Vancouver', '2023-12-05'), 
(4, 'Vancouver', 'Calgary', '2023-12-05'), 
(5, 'Vancouver', 'Toronto', '2023-12-05'), 
(6, 'Toronto', 'Vancouver', '2023-12-05');
