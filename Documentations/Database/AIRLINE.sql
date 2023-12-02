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
('A', '737', 5, 5, 10), 
('B', '737', 5, 5, 10), 
('C', '787', 5, 5, 10), 
('D', '787', 5, 5, 10), 
('E', '747', 5, 5, 10), 
('F', '747', 5, 5, 10);

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
    seatNo VARCHAR(20) NOT NULL,
    flightID INT NOT NULL,
    availability INT DEFAULT(0),
    seatType VARCHAR(20) NOT NULL,
    rowNumber INT NOT NULL,
    columnChar CHAR(1) NOT NULL,
    PRIMARY KEY (seatNo, flightID), 
    FOREIGN KEY (flightID) REFERENCES FLIGHT(flightID),
    FOREIGN KEY (seatType) REFERENCES SEAT_TYPE_PRICES(seatType)
);

INSERT INTO SEATS(seatNo, flightID, seatType, rowNumber, columnChar)
VALUES
-- Business Seats (Rows 1-5)
('1A', 1, 'Business', 1, 'A'), ('1B', 1, 'Business', 1, 'B'), ('1C', 1, 'Business', 1, 'C'), ('1D', 1, 'Business', 1, 'D'), ('1E', 1, 'Business', 1, 'E'), ('1F', 1, 'Business', 1, 'F'),
('2A', 1, 'Business', 2, 'A'), ('2B', 1, 'Business', 2, 'B'), ('2C', 1, 'Business', 2, 'C'), ('2D', 1, 'Business', 2, 'D'), ('2E', 1, 'Business', 2, 'E'), ('2F', 1, 'Business', 2, 'F'),
('3A', 1, 'Business', 3, 'A'), ('3B', 1, 'Business', 3, 'B'), ('3C', 1, 'Business', 3, 'C'), ('3D', 1, 'Business', 3, 'D'), ('3E', 1, 'Business', 3, 'E'), ('3F', 1, 'Business', 3, 'F'),
('4A', 1, 'Business', 4, 'A'), ('4B', 1, 'Business', 4, 'B'), ('4C', 1, 'Business', 4, 'C'), ('4D', 1, 'Business', 4, 'D'), ('4E', 1, 'Business', 4, 'E'), ('4F', 1, 'Business', 4, 'F'),
('5A', 1, 'Business', 5, 'A'), ('5B', 1, 'Business', 5, 'B'), ('5C', 1, 'Business', 5, 'C'), ('5D', 1, 'Business', 5, 'D'), ('5E', 1, 'Business', 5, 'E'), ('5F', 1, 'Business', 5, 'F'),
('6A', 1, 'Comfort', 6, 'A'), ('6B', 1, 'Comfort', 6, 'B'), ('6C', 1, 'Comfort', 6, 'C'), ('6D', 1, 'Comfort', 6, 'D'), ('6E', 1, 'Comfort', 6, 'E'), ('6F', 1, 'Comfort', 6, 'F'),
('7A', 1, 'Comfort', 7, 'A'), ('7B', 1, 'Comfort', 7, 'B'), ('7C', 1, 'Comfort', 7, 'C'), ('7D', 1, 'Comfort', 7, 'D'), ('7E', 1, 'Comfort', 7, 'E'), ('7F', 1, 'Comfort', 7, 'F'),
('8A', 1, 'Comfort', 8, 'A'), ('8B', 1, 'Comfort', 8, 'B'), ('8C', 1, 'Comfort', 8, 'C'), ('8D', 1, 'Comfort', 8, 'D'), ('8E', 1, 'Comfort', 8, 'E'), ('8F', 1, 'Comfort', 8, 'F'),
('9A', 1, 'Comfort', 9, 'A'), ('9B', 1, 'Comfort', 9, 'B'), ('9C', 1, 'Comfort', 9, 'C'), ('9D', 1, 'Comfort', 9, 'D'), ('9E', 1, 'Comfort', 9, 'E'), ('9F', 1, 'Comfort', 9, 'F'),
('10A', 1, 'Comfort', 10, 'A'), ('10B', 1, 'Comfort', 10, 'B'), ('10C', 1, 'Comfort', 10, 'C'), ('10D', 1, 'Comfort', 10, 'D'), ('10E', 1, 'Comfort', 10, 'E'), ('10F', 1, 'Comfort', 10, 'F'),
('11A', 1, 'Ordinary', 11, 'A'), ('11B', 1, 'Ordinary', 11, 'B'), ('11C', 1, 'Ordinary', 11, 'C'), ('11D', 1, 'Ordinary', 11, 'D'), ('11E', 1, 'Ordinary', 11, 'E'), ('11F', 1, 'Ordinary', 11, 'F'),
('12A', 1, 'Ordinary', 12, 'A'), ('12B', 1, 'Ordinary', 12, 'B'), ('12C', 1, 'Ordinary', 12, 'C'), ('12D', 1, 'Ordinary', 12, 'D'), ('12E', 1, 'Ordinary', 12, 'E'), ('12F', 1, 'Ordinary', 12, 'F'),
('13A', 1, 'Ordinary', 13, 'A'), ('13B', 1, 'Ordinary', 13, 'B'), ('13C', 1, 'Ordinary', 13, 'C'), ('13D', 1, 'Ordinary', 13, 'D'), ('13E', 1, 'Ordinary', 13, 'E'), ('13F', 1, 'Ordinary', 13, 'F'),
('14A', 1, 'Ordinary', 14, 'A'), ('14B', 1, 'Ordinary', 14, 'B'), ('14C', 1, 'Ordinary', 14, 'C'), ('14D', 1, 'Ordinary', 14, 'D'), ('14E', 1, 'Ordinary', 14, 'E'), ('14F', 1, 'Ordinary', 14, 'F'),
('15A', 1, 'Ordinary', 15, 'A'), ('15B', 1, 'Ordinary', 15, 'B'), ('15C', 1, 'Ordinary', 15, 'C'), ('15D', 1, 'Ordinary', 15, 'D'), ('15E', 1, 'Ordinary', 15, 'E'), ('15F', 1, 'Ordinary', 15, 'F'),
('16A', 1, 'Ordinary', 16, 'A'), ('16B', 1, 'Ordinary', 16, 'B'), ('16C', 1, 'Ordinary', 16, 'C'), ('16D', 1, 'Ordinary', 16, 'D'), ('16E', 1, 'Ordinary', 16, 'E'), ('16F', 1, 'Ordinary', 16, 'F'),
('17A', 1, 'Ordinary', 17, 'A'), ('17B', 1, 'Ordinary', 17, 'B'), ('17C', 1, 'Ordinary', 17, 'C'), ('17D', 1, 'Ordinary', 17, 'D'), ('17E', 1, 'Ordinary', 17, 'E'), ('17F', 1, 'Ordinary', 17, 'F'),
('18A', 1, 'Ordinary', 18, 'A'), ('18B', 1, 'Ordinary', 18, 'B'), ('18C', 1, 'Ordinary', 18, 'C'), ('18D', 1, 'Ordinary', 18, 'D'), ('18E', 1, 'Ordinary', 18, 'E'), ('18F', 1, 'Ordinary', 18, 'F'),
('19A', 1, 'Ordinary', 19, 'A'), ('19B', 1, 'Ordinary', 19, 'B'), ('19C', 1, 'Ordinary', 19, 'C'), ('19D', 1, 'Ordinary', 19, 'D'), ('19E', 1, 'Ordinary', 19, 'E'), ('19F', 1, 'Ordinary', 19, 'F'),
('20A', 1, 'Ordinary', 20, 'A'), ('20B', 1, 'Ordinary', 20, 'B'), ('20C', 1, 'Ordinary', 20, 'C'), ('20D', 1, 'Ordinary', 20, 'D'), ('20E', 1, 'Ordinary', 20, 'E'), ('20F', 1, 'Ordinary', 20, 'F');

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

DROP TABLE IF EXISTS AIRLINE_AGENT;
CREATE TABLE AIRLINE_AGENT (
	userID int not null auto_increment,
    email varchar(50) not null,
    password varchar(20) not null,
    primary key (userID)
);

INSERT INTO AIRLINE_AGENT (email, password)
VALUES
('arlineuser1@gmail.com', '123'),
('arlineuser2@gmail.com', '123'),
('arlineuser3@gmail.com', '123');


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
(1, 'mjordan@gmail.com', 1, '350.00'),
(1, 'scrosby@gmail.com', 1, '800.00'),
(1, 'cmcdavid@gmail.com', 1, '1000.00'),
(1, 'billrussell@gmail.com', 1, '500.00'),
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
(6, '19E', 1),
(7, '5A', 1),
(7, '5B', 1),
(8, '5E', 1),
(8, '5F', 1),
(9, '13A', 1),
(9, '13B', 1),
(9, '13C', 1),
(9, '13D', 1),
(10, '13E', 1);

UPDATE SEATS AS s
JOIN BOOKED_SEATS AS b ON s.seatNo = b.seatNo AND s.flightID = b.flightID
SET s.availability = 1;