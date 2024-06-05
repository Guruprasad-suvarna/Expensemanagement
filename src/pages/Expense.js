import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import './Expense.css'; // Import the CSS file

function Expense() {
  const [numUsers, setNumUsers] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(startOfWeek(new Date()));
  const [userData, setUserData] = useState(Array(numUsers).fill().map(() => ({
    moneySpent: Array(7).fill(''),
    spentFor: Array(7).fill('')
  })));

  const handleUserChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      setNumUsers(num > 0 ? num : 1);
      setUserData(Array(num).fill().map(() => ({
        moneySpent: Array(7).fill(''),
        spentFor: Array(7).fill('')
      })));
    } else {
      setNumUsers(); // Set a default value if the input is empty or invalid
      setUserData([{
        moneySpent: Array(7).fill(''),
        spentFor: Array(7).fill('')
      }]);
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

  const renderExpenseTables = () => {
    return userData.map((user, index) => (
    //  <div className="place">
      <div key={index} className="user-column"> {/* Add user-column class */}
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
              <tr key={date}>
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
      // </div>
    ));
  };

  return (
    <div className="container"> {/* Add container class */}
      <div className="App1">
        <h1>Monthly Expense Management System</h1>
        <div className="calendar">
          <div className="controls">
            <button onClick={handlePrevWeek}>Previous Week</button>
            {/* <input1 type="month" value={format(selectedMonth, 'yyyy-MM')} onChange={handleMonthChange} /> */}
            <input type="month" value={format(selectedMonth, 'yyyy-MM')} onChange={handleMonthChange} className="calendar-input"  />
            <button onClick={handleNextWeek}>Next Week</button>
            <button type="submit" className='button1'>Save</button>
          </div>
          {/* <div className="week-dates">{renderWeekDates()}</div> */}
        </div>
        
        <label>
          Number of Users:
          <input
            type="number"
            min=""
            value={numUsers}
            onChange={handleUserChange}
          />
        </label>

        {renderExpenseTables()}
     
      </div>
    </div>
  );
}

export default Expense;
