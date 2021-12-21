import React from 'react';
import { useState } from 'react';

const DatePickers = () => {
  const [startDate, setStartDate] = useState(new Date());
  const CustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <DatePickers
      selected={startDate}
      onChange={date => setStartDate(date)}
      customInput={<CustomInput />}
    />
  );
};
  export default DatePickers;