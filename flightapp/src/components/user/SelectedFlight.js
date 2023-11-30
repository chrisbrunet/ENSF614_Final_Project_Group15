import React, { useState } from 'react';
import '../css/styles.css';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTableCell = styled.td`
  border: 1px solid #000;
  width: 10px;
  height: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;

  &.selected {
    background-color: #007bff;
    color: #fff;
  }
`;

const SelectedFlight = () => {

    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cancellationInsurance, setCancellationInsurance] = useState(false);

    const toggleSeat = (seatId) => {
        if (!seatId.includes('aisle')) {
            setSelectedSeatIds((prevSelectedSeatIds) => {
                if (prevSelectedSeatIds.includes(seatId)) {
                    return prevSelectedSeatIds.filter((id) => id !== seatId);
                } else {
                    return [...prevSelectedSeatIds, seatId];
                }
            });
        }
    };

    const updateSelectedSeatsList = () => {
        return selectedSeatIds.map((seatId) => (
            <li key={seatId}>{seatId}</li>
        ));
    };

    const calculateTotalPrice = () => {
        let newTotalPrice = selectedSeatIds.length * 250;

        if (cancellationInsurance) {
            newTotalPrice += 50;
        }

        setTotalPrice(newTotalPrice);
    };

    const handleCancellationInsuranceChange = () => {
        setCancellationInsurance((prevCancellationInsurance) => !prevCancellationInsurance);
        calculateTotalPrice();
    };

    const seatTableBody = [];
    for (let i = 1; i <= 20; i++) {
        const row = [];

        for (let j = 1; j <= 7; j++) {
            if (j === 4) {
                row.push(<StyledTableCell key={`row${i}col${j}`} className="aisle"></StyledTableCell>);
            } else {
                const seatId = `Seat ${i + String.fromCharCode(64 + j - (j > 4 ? 2 : 0))}`;
                row.push(
                    <StyledTableCell
                        key={`row${i}col${j}`}
                        onClick={() => toggleSeat(seatId)}
                        className={selectedSeatIds.includes(seatId) ? 'selected' : ''}
                    >
                        {seatId}
                    </StyledTableCell>
                );
            }
        }

        seatTableBody.push(<tr key={`row${i}`}>{row}</tr>);
    }

    return (
        <div>
            <div className="navbar">
                <h1>Flight ####</h1>
                <button onClick={handleHomeButton} className="btn">
                    Home
                </button>
            </div>
            <div className="card">
                <h2>Select Seats</h2>
                <div className="flex-container">
                    <div className="seat-map">
                        <StyledTable id="seatTable">
                            <tbody id="seatTableBody">{seatTableBody}</tbody>
                        </StyledTable>
                    </div>
                    <div className="selected-seats">
                        <h3>Selected Seats</h3>
                        <ul id="selectedSeatsList">{updateSelectedSeatsList()}</ul>
                        <div className="cancellation-insurance">
                            <input
                                type="checkbox"
                                id="cancellationInsurance"
                                checked={cancellationInsurance}
                                onChange={handleCancellationInsuranceChange}
                            />
                            <label htmlFor="cancellationInsurance">Cancellation Insurance (+$50)</label>
                        </div>
                        <div className="total-price">
                            Total Price: $<span id="totalPrice">{totalPrice}</span>
                        </div>
                        <button className="btn">Confirm and Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedFlight;