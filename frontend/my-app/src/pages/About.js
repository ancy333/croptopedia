import React from 'react'
import '../components/About.css'

const About = () => {
  return (
    <>
    <div className="AboutClass"> <p>
    The dimensions of the various features:
    <ul>
      <li>N - ratio of Nitrogen content in soil - kg/ha</li>
      <li>P - ratio of Phosphorous content in soil - kg/ha</li>
      <li>K - ratio of Potassium content in soil - kg/ha</li>
      <li>temperature - temperature in degree Celsius</li>
      <li>humidity - relative humidity in %</li>
      <li>ph - ph value of the soil</li>
      <li>rainfall - rainfall in mm</li>
    </ul>
    </p>
    <p>
          The data used for this app is from the following link:
          <a href="https://www.kaggle.com/atharvaingle/crop-recommendation-dataset">
            Crop Recommendation Dataset
          </a>
        </p>
    
    </div>
    </>
  )
}

export default About

