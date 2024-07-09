import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import SimpleChart from '../SimpleChart'; // Import the SimpleChart component
import './Chartdiv.css';

const Chartdiv = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState('N');

  // useEffect to parse the CSV file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Crop_recommendation.csv');
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        const result = await reader.read();
        const csv = decoder.decode(result.value);
        
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
            console.log('Parsed CSV data:', result.data); // Debugging
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  const featureOptions = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];

  const handleFeatureChange = (event) => {
    setSelectedFeature(event.target.value);
  };

  return (
    <div className="App1">
      <header className="App-header">
        
      </header>

      <section>
        <h1> Variation of each crop with the features</h1>
        <label >Select the feature: </label>
        <select value={selectedFeature} onChange={handleFeatureChange}>
          {featureOptions.map(feature => (
            <option key={feature} value={feature}>{feature}</option>
          ))}
        </select>

        <SimpleChart data={data} selectedFeature={selectedFeature} />  {/* Use SimpleChart */}
      </section>
    </div>
  );
};

export default Chartdiv;
