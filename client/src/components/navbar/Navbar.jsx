import React, { useContext } from 'react'
import './navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined'; //! NEED TO REVIEW
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';


const Navbar = () => {
  const {toggleDarkMode, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="left">
        <Link to='/' style={{textDecoration: 'none'}}>
          <span>OK Social</span>  
        </Link>
        <HomeOutlinedIcon />    
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggleDarkMode} /> : <DarkModeOutlinedIcon onClick={toggleDarkMode} /> }  
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search...' />
        </div>
      </div>

      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span> {currentUser.name} </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar