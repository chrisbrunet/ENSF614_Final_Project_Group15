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
(6, 'Toronto', 'Vancouver', '2023-12-05', 200.00),
(1, 'Calgary', 'Winnipeg', '2023-12-06', 300.00),
(2, 'Calgary', 'Saskatoon', '2023-12-06', 100.00),
(3, 'Winnipeg', 'Vancouver', '2023-12-06', 200.00),
(4, 'Toronto', 'Montreal', '2023-12-07', 100.00),
(5, 'Montreal', 'St. Johns', '2023-12-08', 400.00),
(6, 'Calgary', 'Whitehorse', '2023-12-09', 300.00);

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
('2A', 1, 'Business'), ('2B', 1, 'Business'), ('2C', 1, 'Business'), ('2D', 1, 'Business'), ('2E', 1, 'Business'), ('2F', 1, 'Business'), 
('3A', 1, 'Business'), ('3B', 1, 'Business'), ('3C', 1, 'Business'), ('3D', 1, 'Business'), ('3E', 1, 'Business'), ('3F', 1, 'Business'),
('4A', 1, 'Business'), ('4B', 1, 'Business'), ('4C', 1, 'Business'), ('4D', 1, 'Business'), ('4E', 1, 'Business'), ('4F', 1, 'Business'), 
('5A', 1, 'Business'), ('5B', 1, 'Business'), ('5C', 1, 'Business'), ('5D', 1, 'Business'), ('5E', 1, 'Business'), ('5F', 1, 'Business'), 
('6A', 1, 'Comfort'), ('6B', 1, 'Comfort'), ('6C', 1, 'Comfort'), ('6D', 1, 'Comfort'), ('6E', 1, 'Comfort'), ('6F', 1, 'Comfort'), 
('7A', 1, 'Comfort'), ('7B', 1, 'Comfort'), ('7C', 1, 'Comfort'), ('7D', 1, 'Comfort'), ('7E', 1, 'Comfort'), ('7F', 1, 'Comfort'), 
('8A', 1, 'Comfort'), ('8B', 1, 'Comfort'), ('8C', 1, 'Comfort'), ('8D', 1, 'Comfort'), ('8E', 1, 'Comfort'), ('8F', 1, 'Comfort'), 
('9A', 1, 'Comfort'), ('9B', 1, 'Comfort'), ('9C', 1, 'Comfort'), ('9D', 1, 'Comfort'), ('9E', 1, 'Comfort'), ('9F', 1, 'Comfort'), 
('10A', 1, 'Comfort'), ('10B', 1, 'Comfort'), ('10C', 1, 'Comfort'), ('10D', 1, 'Comfort'), ('10E', 1, 'Comfort'), ('10F', 1, 'Comfort'),
('11A', 1, 'Ordinary'), ('11B', 1, 'Ordinary'), ('11C', 1, 'Ordinary'), ('11D', 1, 'Ordinary'), ('11E', 1, 'Ordinary'), ('11F', 1, 'Ordinary'), 
('12A', 1, 'Ordinary'), ('12B', 1, 'Ordinary'), ('12C', 1, 'Ordinary'), ('12D', 1, 'Ordinary'), ('12E', 1, 'Ordinary'), ('12F', 1, 'Ordinary'), 
('13A', 1, 'Ordinary'), ('13B', 1, 'Ordinary'), ('13C', 1, 'Ordinary'), ('13D', 1, 'Ordinary'), ('13E', 1, 'Ordinary'), ('13F', 1, 'Ordinary'), 
('14A', 1, 'Ordinary'), ('14B', 1, 'Ordinary'), ('14C', 1, 'Ordinary'), ('14D', 1, 'Ordinary'), ('14E', 1, 'Ordinary'), ('14F', 1, 'Ordinary'), 
('15A', 1, 'Ordinary'), ('15B', 1, 'Ordinary'), ('15C', 1, 'Ordinary'), ('15D', 1, 'Ordinary'), ('15E', 1, 'Ordinary'), ('15F', 1, 'Ordinary'), 
('16A', 1, 'Ordinary'), ('16B', 1, 'Ordinary'), ('16C', 1, 'Ordinary'), ('16D', 1, 'Ordinary'), ('16E', 1, 'Ordinary'), ('16F', 1, 'Ordinary'), 
('17A', 1, 'Ordinary'), ('17B', 1, 'Ordinary'), ('17C', 1, 'Ordinary'), ('17D', 1, 'Ordinary'), ('17E', 1, 'Ordinary'), ('17F', 1, 'Ordinary'), 
('18A', 1, 'Ordinary'), ('18B', 1, 'Ordinary'), ('18C', 1, 'Ordinary'), ('18D', 1, 'Ordinary'), ('18E', 1, 'Ordinary'), ('18F', 1, 'Ordinary'), 
('19A', 1, 'Ordinary'), ('19B', 1, 'Ordinary'), ('19C', 1, 'Ordinary'), ('19D', 1, 'Ordinary'), ('19E', 1, 'Ordinary'), ('19F', 1, 'Ordinary'), 
('20A', 1, 'Ordinary'), ('20B', 1, 'Ordinary'), ('20C', 1, 'Ordinary'), ('20D', 1, 'Ordinary'), ('20E', 1, 'Ordinary'), ('20F', 1, 'Ordinary');

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
(1, 'bingbong@gmail.com', 1, '350.00'),
(1, 'willsmith@gmail.com', 1, '800.00'),
(1, 'lebronjames@gmail.com', 1, '1000.00'),
(1, 'tombrady@gmail.com', 1, '355.00'),
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
(1, '1B', 1),
(1, '1C', 1),
(2, '11B', 1),
(2, '11C', 1),
(3, '2A', 1),
(3, '2B', 1),
(4, '8D', 1),
(4, '8E', 1),
(4, '8F', 1),
(5, '15A', 1),
(5, '15B', 1),
(6, '19C', 1),
(6, '19D', 1),
(6, '19E', 1);

UPDATE SEATS AS s
JOIN BOOKED_SEATS AS b ON s.seatNo = b.seatNo AND s.flightID = b.flightID
SET s.availability = 1;