import React from 'react'
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
import { Link } from 'react-router-dom';






const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left">
        <Link to='/' style={{textDecoration: 'none'}}>
        <span>OK Social</span>  
        <HomeOutlinedIcon />    
        <DarkModeOutlinedIcon />  
        <ViewDayOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search...' />
        </div>
        </Link>
      </div>

      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="user">
          {/* <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress$cs=tinysrgb&w=1600" alt="" /> */}
          <span> Kevin Espina </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar