// src/App.js
import React from 'react';
import PlotComponent from '../components/PlotComponent';
import '../components/DataAnalysis.css';

const DataAnalysis = () => {
    return (
        <div className="App">
            <h1>Crop Nutrient Visualization</h1>
            <PlotComponent nutrient="nitrogen" />
            <PlotComponent nutrient="phosphorus" />
            <PlotComponent nutrient="potassium" />
            {/* <div className='plot-container plotly'>
            <PlotComponent nutrient ="npk"  />
            </div> */}
            
        </div>
    );
}

export default DataAnalysis;
