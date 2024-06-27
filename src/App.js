import React, { useState } from 'react';
import Chart from './components/Chart';
import './App.css';

const timeFrame = [
  "daily",
  "weekly",
  "monthly"
]

const App = () => {
  const [period, setPeriod] = useState('daily');

  return (
    <div className="App">
      <h1 className='heading'>Time Series Data Chart</h1>
      <div className="controls">
        {timeFrame.map(each=>(
          <button key ={each}  onClick={() => setPeriod(each)} className={period === each ? "active" : ""}>{each}</button>
          
        ))}
        
      </div>
      <Chart period={period} />
    </div>
  );
};

export default App;

