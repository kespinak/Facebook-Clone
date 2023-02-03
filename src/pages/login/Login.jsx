import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';


const Login = () => {

  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Welcome to OKSOCIAL </h1>
          <p>Please create an account and join us at kev socials</p>
          <span>Don't have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='Username' />
            <input type='text' placeholder='Password' />
            <button onClick={handleLogin}>Login</button>            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login