//src/DataAnalysis.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import '../PlotComponent.css'

const PlotComponent = ({ nutrient }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Adjust the URL based on the nutrient type
        // src/DataAnalysis.js
        const url = `http://127.0.0.1:5000/plot/${nutrient}`;


        axios.get(url)
            .then(response => {
                // Parse the JSON string to an object
                const figData = JSON.parse(response.data);
                setData(figData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [nutrient]);

    return (
        <div>
            {data ? (
                <Plot
                    data={data.data}
                    layout={data.layout}
                    config={data.config}
                />
            ) : (
                <p>Loading...</p>
            )}
       </div>
    );
};

export default PlotComponent;


