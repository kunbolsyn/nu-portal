import React, { useState } from 'react';
import '../../styles/VacationManager.css';
import vacationData from './vacationData.json';

const VacationManager = () => {
  const [data, setData] = useState(vacationData);
  const [currentYear] = useState(new Date().getFullYear());
  const [activeYear, setActiveYear] = useState(null);
  const [newPeriod, setNewPeriod] = useState({ startDate: '', endDate: '' });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const parseDateInput = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day);
  };

  const calculateDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleAddPeriod = () => {
    const startDate = parseDateInput(newPeriod.startDate);
    const endDate = parseDateInput(newPeriod.endDate);
    
    if (startDate && endDate && startDate <= endDate) {
      const days = calculateDays(startDate, endDate);
      const updatedData = JSON.parse(JSON.stringify(data));
      const year = updatedData.vacationYears[activeYear];
      
      if (days <= year.remainingDays) {
        year.periods.push({
          startDate: formatDate(newPeriod.startDate.split('-').reverse().join('/')),
          endDate: formatDate(newPeriod.endDate.split('-').reverse().join('/')),
          days
        });
        
        year.usedDays += days;
        year.remainingDays -= days;
        
        // Carry over remaining days to next year if applicable
        if (activeYear < updatedData.vacationYears.length - 1) {
          const nextYear = updatedData.vacationYears[activeYear + 1];
          nextYear.totalDays += year.remainingDays;
          nextYear.remainingDays += year.remainingDays;
          year.remainingDays = 0;
        }
        
        setData(updatedData);
        setNewPeriod({ startDate: '', endDate: '' });
        setActiveYear(null);
      } else {
        alert(`Not enough remaining days (${year.remainingDays} left, ${days} requested)`);
      }
    }
  };

  const getYearFromDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return parseInt(year);
  };

  const isPastYear = (year) => year < currentYear;
  const isCurrentYear = (year) => year === currentYear;
  const isFutureYear = (year) => year > currentYear;

  return (
    <div className="vacation-manager">
      <h1>Manage Vacations</h1>
      <div className="acceptance-date">
        <strong>Acceptance Date:</strong> {data.acceptanceDate}
      </div>
      
      <table className="vacation-table">
        <thead>
          <tr>
            <th>Begin Date</th>
            <th>End Date</th>
            <th>Used Days</th>
            <th>Remaining Days</th>
            <th>Total Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.vacationYears.map((year, index) => {
            const yearValue = getYearFromDate(year.beginDate);
            return (
              <tr key={index}>
                <td>{year.beginDate}</td>
                <td>{year.endDate}</td>
                <td>{year.usedDays}</td>
                <td>{year.remainingDays}</td>
                <td>{year.totalDays}</td>
                <td>
                  {isPastYear(yearValue) ? (
                    <button 
                      className="calendar-icon past" 
                      onClick={() => setActiveYear(activeYear === index ? null : index)}
                    >
                      📅
                    </button>
                  ) : (
                    <button 
                      className={`calendar-icon ${isCurrentYear(yearValue) ? 'current' : 'future'}`} 
                      onClick={() => setActiveYear(index)}
                    >
                      📅
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {activeYear !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            {isPastYear(getYearFromDate(data.vacationYears[activeYear].beginDate)) ? (
              <>
                <h3>Vacation Periods for {data.vacationYears[activeYear].beginDate} - {data.vacationYears[activeYear].endDate}</h3>
                {data.vacationYears[activeYear].periods.length > 0 ? (
                  <ul className="periods-list">
                    {data.vacationYears[activeYear].periods.map((period, i) => (
                      <li key={i}>
                        {period.startDate} - {period.endDate} ({period.days} days)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No vacation periods recorded.</p>
                )}
              </>
            ) : (
              <>
                <h3>Add Vacation Period for {data.vacationYears[activeYear].beginDate} - {data.vacationYears[activeYear].endDate}</h3>
                <div className="date-inputs">
                  <div>
                    <label>Start Date:</label>
                    <input 
                      type="date" 
                      value={newPeriod.startDate}
                      onChange={(e) => setNewPeriod({...newPeriod, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label>End Date:</label>
                    <input 
                      type="date" 
                      value={newPeriod.endDate}
                      onChange={(e) => setNewPeriod({...newPeriod, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="add-btn" onClick={handleAddPeriod}>
                    Add Period
                  </button>
                </div>
              </>
            )}
            <button className="close-btn" onClick={() => setActiveYear(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationManager;