import React, { useState } from "react";
import './Form.css'

const Form = () => {
  // State to manage loading state
  const [isLoading, setIsloading] = useState(false);
  // State to manage form data
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  // State to manage prediction result
  const [result, setResult] = useState("");
  // State to manage displaying result
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  // Function to handle the 'Predict Selling Price' button click
  const handlePredictClick = () => {
    const url = "http://localhost:5000/predict";
    setIsloading(true);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };

  return (
    <>
      
        <h1 className="text-center">Crop Recommendation</h1>
        <div className="container">
          <form method="post" acceptCharset="utf-8" name="Modelform">
            <div className="text-center mt-3">
           
              <label>
                <b>Enter N:</b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="N"
                name="N"
                value={formData.N}
                onChange={handleChange}
                placeholder="Enter N "
              />
              
            </div>
            <div className="text-center mt-3">
              <label>
                <b>Enter P:</b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="P"
                name="P"
                value={formData.P}
                onChange={handleChange}
                placeholder="Enter P"
              />
                </div>
            
            
              <div className="text-center mt-3">
              <label>
                <b>
                  Enter K:
                </b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="K"
                name="K"
                value={formData.K}
                onChange={handleChange}
                placeholder="K "
              />
                </div>
              


                <div className="text-center mt-3">
              <label>
                <b>
                  Enter the temperature:
                </b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="temperature"
              />
              </div>
            
              
              <div className="text-center mt-3">
              <label>
                <b>
                  Enter the humidity:
                </b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="humidity"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                placeholder="humidity "
              />
              </div>
            
            
              <div className="text-center mt-3">
              <label>
                <b>
                  Enter the ph:
                </b>
              </label>
              <br />
              <input
                type="float"
                className="form-control"
                id="ph"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                placeholder="ph"
              />
               </div> 
           
            
            
               <div className="text-center mt-3">
              <label>
                <b>Enter the rainfall</b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="rainfall"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder="Enter the rainfall"
                />
                </div>
            
            
            <div className="form-group mt-3">
              <button
                className="btn btn-primary form-control"
                disabled={isLoading}
                onClick={!isLoading ? handlePredictClick : null}
              >
                Predict 
              </button>
            </div>
        
        
        </form>
          
          
          
          <div className="text-center ">
            <h4>
              {showSpan && (
                <span id="prediction">
                  {result && Object.keys(result).length !== 0 ? (
                    <p>The most suitable crop for you is {result} </p>
                  ) : (
                    <p>Please fill out each field in the form completely</p>
                  )}
                </span>
              )}
            </h4>
          </div>
        </div>
      
    </>
  );
};
export default Form;



//div className="container text-center mt-4"