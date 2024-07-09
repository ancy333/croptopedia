import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/FileUpload';
import DataAnalysis from './pages/DataAnalysis';
import Recommendations from './pages/Recommendations';
import About from './pages/About';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Chartdiv from './components/Chartdiv';
import './App.css';
// Import global styles

const App = () => {
  const [theme, colorMode] = useMode();
  // eslint-disable-next-line
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <Router>
       <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Navbar setIsSidebar={setIsSidebar} />
        <div className="app">
        <main className="content">
        <Sidebar />
       
          
            <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/dataanalysis" element={<DataAnalysis />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/chartdiv" element={<Chartdiv />} />  
            <Route path="/about" element={<About />} />
            </Routes>
          
      </main>
      </div>
     
      </ThemeProvider>
    </ColorModeContext.Provider>
    </Router>
    </>
  );
};

export default App;








