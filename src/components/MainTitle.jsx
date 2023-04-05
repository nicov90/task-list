import React from 'react';
import Date from './Date';

const MainTitle = () => {
  return (
    <div className="title-container">
      <h1 className="title">Task list</h1>
      <Date id="currentDate" />
    </div>
  );
}

export { MainTitle }