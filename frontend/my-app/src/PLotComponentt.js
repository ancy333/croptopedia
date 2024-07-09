// // src/components/HomePage.js
// import React from 'react';

// import UploadButton from './uploadButton';

// const HomePage = () => {
//   const handleUploadComplete = (responseData) => {
//     // Handle completion of upload if needed (e.g., update state, show success message)
//     console.log('Upload completed:', responseData);
//     alert('File uploaded successfully!');
//   };

//   return (
//     <div className="home-page">
//       <h1>Welcome to Crop Recommendation System</h1>
//       <p>Upload your dataset to get started.</p>
//       <UploadButton onUploadComplete={handleUploadComplete} />
//       <div>
//         p
//       </div>

//     </div>
   
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
//import './PlotComponent.css'; // Import the CSS file

function PlotComponentt({ endpoint, title }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000${endpoint}`)
     .then(response => response.json())
     .then(data => {
        console.log("Fetched data:", data);
        setData(JSON.parse(data));
      })
     .catch(error => console.error('Error fetching the plot data:', error));
  }, [endpoint]);

  return (
    <div className="plot-wrapper">
      <h2>{title}</h2>
      {data? (
        <Plot
          data={data.data}
          layout={{
           ...data.layout,
            height: 600, // Adjusted the plot height
            width: 800, // Adjusted the plot width
            margin: { l: 100, r: 40, t: 80, b: 100 },
            font: { size: 14 }
          }}
          config={{ responsive: true }}
        />
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default PlotComponentt;
