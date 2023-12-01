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
    numBusinessRows int not null,
	numComfortRows int not null,
    numEconomyRows int not null,
	primary key (aircraftID), 
    foreign key (crewID) references CREW(crewID)
);

INSERT INTO AIRCRAFT (crewID, aircraftType, numBusinessRows, numComfortRows, numEconomyRows)
VALUES
('A', '737', 6, 10, 20), 
('B', '737', 6, 10, 20), 
('C', '787', 10, 10, 20), 
('D', '787', 10, 10, 20), 
('E', '747', 20, 20, 40), 
('F', '747', 20, 20, 40);

DROP TABLE IF EXISTS FLIGHT;
CREATE TABLE FLIGHT (
	flightID int not null auto_increment,
    aircraftID int not null,
    departCity varchar(20) not null,
	arriveCity varchar(20) not null,
    flightDate date not null,
    basePrice decimal(10,2) not null,
	primary key (flightID), 
    foreign key (aircraftID) references AIRCRAFT(aircraftID)
);

INSERT INTO FLIGHT (aircraftID, departCity, arriveCity, flightDate, basePrice)
VALUES
(1, 'Calgary', 'Toronto', '2023-12-05', 100.00), 
(2, 'Toronto', 'Calgary', '2023-12-05', 100.00), 
(3, 'Calgary', 'Vancouver', '2023-12-05', 80.00), 
(4, 'Vancouver', 'Calgary', '2023-12-05', 80.00), 
(5, 'Vancouver', 'Toronto', '2023-12-05', 200.00), 
(6, 'Toronto', 'Vancouver', '2023-12-05', 200.00);

DROP TABLE IF EXISTS SEAT_TYPE_PRICES;
CREATE TABLE SEAT_TYPE_PRICES (
    seatType varchar(20) not null,
    priceMultiplier float not null,
    primary key (seatType)
);

INSERT INTO SEAT_TYPE_PRICES (seatType, priceMultiplier)
VALUES
('Ordinary', 1),
('Comfort', 1.5),
('Business', 2);

DROP TABLE IF EXISTS SEATS;
CREATE TABLE SEATS (
    seatNo varchar(20) not null,
	flightID int not null,
    availability int default(0),
    seatType varchar(20) not null,
	primary key (seatNo, flightID), 
    foreign key (flightID) references FLIGHT(flightID),
    foreign key (seatType) references SEAT_TYPE_PRICES(seatType)
);

INSERT INTO SEATS(seatNo, flightID, seatType)
VALUES
('1A', 1, 'Business'), ('1B', 1, 'Business'), ('1C', 1, 'Business'), ('1D', 1, 'Business'), ('1E', 1, 'Business'), ('1F', 1, 'Business'), 
('2A', 1, 'Comfort'), ('2B', 1, 'Comfort'), ('2C', 1, 'Comfort'), ('2D', 1, 'Comfort'), ('2E', 1, 'Comfort'), ('2F', 1, 'Comfort'), 
('3A', 1, 'Ordinary'), ('3B', 1, 'Ordinary'), ('3C', 1, 'Ordinary'), ('3D', 1, 'Ordinary'), ('3E', 1, 'Ordinary'), ('3F', 1, 'Ordinary');

-- DROP TABLE IF EXISTS USER;
-- CREATE TABLE USER (
--     email varchar(50) not null,
--     primary key (email)
-- );

-- INSERT INTO USER (email)
-- VALUES
-- ('johndoe@gmail.com'),
-- ('cb123@gmail.com'),
-- ('billgates@icloud.com'),
-- ('tomcruise@gmail.com'),
-- ('example@gmail.com'),
-- ('coolguy@gmail.com');

DROP TABLE IF EXISTS REGISTERED_USER;
CREATE TABLE REGISTERED_USER (
	userID int not null auto_increment,
    email varchar(50) not null,
    firstName varchar(20) not null,
    lastName varchar(20) not null,
    address varchar(20) not null,
    birthdate date not null,
    password varchar(20) not null,
    primary key (userID)
);

INSERT INTO REGISTERED_USER (email, firstName, lastName, address, birthdate, password)
VALUES
('johndoe@gmail.com', 'John', 'Doe', '123 1st Street', '1990-01-01', 'pword123'),
('cb123@gmail.com', 'Chris', 'Brunet', '123 2st Street', '1991-01-01', 'pword1234'),
('tomcruise@gmail.com', 'Tom', 'Cruise', '123 3st Street', '1992-01-01', 'pword12345'),
('coolguy@gmail.com', 'Cool', 'Guy', '123 4st Street', '1993-01-01', 'pword123456'),
('example@gmail.com', 'Ex', 'Ample', '123 5st Street', '1994-01-01', 'pword1234567');

DROP TABLE IF EXISTS AIRLINE_CREDIT_CARD;
CREATE TABLE AIRLINE_CREDIT_CARD (
    cardNo int not null auto_increment,
    userID int not null,
    primary key (cardNo, userID),
    foreign key (userID) references REGISTERED_USER(userID)
);

INSERT INTO AIRLINE_CREDIT_CARD (userID)
VALUES
(1), (2), (3), (5);

DROP TABLE IF EXISTS PROMOTIONS;
CREATE TABLE PROMOTIONS (
    promoID int not null auto_increment,
    userID int not null,
    primary key (promoID),
    foreign key (userID) references REGISTERED_USER(userID)
);

INSERT INTO PROMOTIONS (userID)
VALUES
(1), (3), (4);

DROP TABLE IF EXISTS COMPANION_TICKETS;
CREATE TABLE COMPANION_TICKETS (
    compantionTicketID int not null auto_increment,
    userID int not null,
    dateClaimed date not null,
    primary key (compantionTicketID),
    foreign key (userID) references REGISTERED_USER(userID)
);

INSERT INTO COMPANION_TICKETS (userID, dateClaimed)
VALUES
(1, '2023-05-01'), (2, '2021-11-05'), (2, '2022-06-05');

DROP TABLE IF EXISTS BOOKING;
CREATE TABLE BOOKING (
    bookingID int not null auto_increment,
    flightID int not null,
    userEmail varchar(50) not null,
    insurance int not null,
    price decimal(10,2) not null,
    primary key (bookingID),
    foreign key (flightID) references FLIGHT(flightID)
);

INSERT INTO BOOKING (flightID, userEmail, insurance, price)
VALUES
(1, 'johndoe@gmail.com', 1, '500.00'),
(1, 'cb123@gmail.com', 0, '200.00');

DROP TABLE IF EXISTS PAYMENT;
CREATE TABLE PAYMENT (
    paymentID int not null auto_increment,
    bookingID int not null,
    cardNo long,
    status int not null default(0),
    primary key (paymentID),
    foreign key (bookingID) references BOOKING(bookingID) ON DELETE CASCADE
);

INSERT INTO PAYMENT (bookingID, cardNo, status)
VALUES
(1, 1111222233334444, 1);

DROP TABLE IF EXISTS BOOKED_SEATS;
CREATE TABLE BOOKED_SEATS (
    bookingID int not null,
    seatNo varchar(20) not null,
    flightID int not null,
    primary key (bookingID, seatNo, flightID),
    foreign key (bookingID) references BOOKING(bookingID) ON DELETE CASCADE,
    foreign key (seatNo, flightID) references SEATS(seatNo, flightID)
);

INSERT INTO BOOKED_SEATS (bookingID, seatNo, flightID)
VALUES
(1, '1A', 1),
(1, '2B', 1),
(1, '3C', 1),
(2, '1B', 1),
(2, '1C', 1);
