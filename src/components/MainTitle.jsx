import React from 'react';
import DateUI from './DateUI';

const MainTitle = () => {
  return (
    <div className="title-container">
      <h1 className="title">Task list</h1>
      <DateUI id="currentDate" />
    </div>
  );
}

export { MainTitle }