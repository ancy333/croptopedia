// // // src/components/Navbar.js

//  import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import './Navbar.css';
// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../theme";
// import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

//   const Navbar = () => {
//     const theme = useTheme();
//     // eslint-disable-next-line
//     const colors = tokens(theme.palette.mode);
//     const colorMode = useContext(ColorModeContext);
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <h1>Crop Dashboard</h1>
//       </div>
//       <div className="navbar-right">
        
//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         </Box>
         
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../theme'; // Assuming ColorModeContext is correctly defined in '../theme'
//import InputBase from '@mui/material/InputBase';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'; // Import individual icons instead of the entire icon set
import './Navbar.css'; // Assuming you have custom styles in Navbar.css

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleColorModeToggle = () => {
    colorMode.toggleColorMode(); // Toggle the color mode using the context function
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Crop Dashboard</h1>
      </div>
      <div className="navbar-right">
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleColorModeToggle}>
            {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          {/* Add other components or functionality as needed */}
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
