import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import './Expense.css'; // Import the CSS file

function Expenseeee() {
  const [numUsers, setNumUsers] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(startOfWeek(new Date()));
  
  // Set maximum number of users here
  const maxUsers = 10; // Change this value to set the maximum number of users
  
  const [userData, setUserData] = useState(Array(maxUsers).fill().map(() => ({
    moneySpent: Array(7).fill(''),
    spentFor: Array(7).fill('')
  })));

  const handleUserChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      setNumUsers(num > 0 ? num : null); // Change to null if num is not positive
    } else {
      setNumUsers(null); // Set to null if input is invalid
    }
  };

  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => addDays(prevDate, -7));
  };

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 7));
  };

  const handleMonthChange = (e) => {
    const selectedMonth = new Date(e.target.value);
    setSelectedMonth(selectedMonth);
    setSelectedDate(startOfWeek(selectedMonth));
  };

  const handleExpenseChange = (e, userIndex, fieldName, dayIndex) => {
    const { value } = e.target;
    setUserData(prevData => {
      const newData = [...prevData];
      newData[userIndex][fieldName][dayIndex] = value;
      return newData;
    });
  };

  return (
    <div className="container">
       <div className="fixed-header"> {/* Fixed header containing Monthly Expense Management System */}
        <h1>Monthly Expense Management System</h1>
        <div className="calendar">
          <div className="controls">
            <button onClick={handlePrevWeek} className="week-button">Previous Week</button> 
            <input type="month" value={format(selectedMonth, 'yyyy-MM')} onChange={handleMonthChange} className="calendar-input"  />
            <button onClick={handleNextWeek} className="week-button">Next Week</button>
            {/* <button onClick={handleNextWeek}>Next Week</button> */}
          </div>
        </div>
      {/* <div className="App1">
        <h1>Monthly Expense Management System</h1>
        <div className="calendar">
          <div className="controls">
            <button onClick={handlePrevWeek}>Previous Week</button>
            <input1 type="month" value={format(selectedMonth, 'yyyy-MM')} onChange={handleMonthChange} />
            <button onClick={handleNextWeek}>Next Week</button>
          </div>
        </div> */}
        
        <label>
          Number of Users:
          <input
            type="number"
            min="1"
            value={numUsers === null ? '' : numUsers} // Display empty string if null
            onChange={handleUserChange}
          />
        </label>

        {/* Scrollable container for user columns */}
        <div className="scroll-container">
          {numUsers !== null && numUsers > 0 && (
            <div className="user-columns">
              {userData.slice(0, numUsers).map((user, index) => (
                <div key={index} className="user-column">
                  <h2>User {index + 1}</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Spent</th>
                        <th>Spent For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i)).map((date, dayIndex) => (
                        <tr key={dayIndex}>
                          <td>{format(date, 'dd')}</td>
                          <td>
                            <input
                              type="number"
                              value={user.moneySpent[dayIndex]}
                              onChange={(e) => handleExpenseChange(e, index, 'moneySpent', dayIndex)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={user.spentFor[dayIndex]}
                              onChange={(e) => handleExpenseChange(e, index, 'spentFor', dayIndex)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenseeee;
