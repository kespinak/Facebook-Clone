import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';
import axios from 'axios';


const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
    // console.log(inputs)
  };

  const handleClick = async (e) => {
    e.preventDefault() //so page wont refresh upon clicking

    try{
      await axios.post('http://localhost:8800/api/auth/register', inputs)
    } catch(err) {
      setErr(err.response.data) //from ChromeConsole
    }

    console.log(err);
  }

  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>OK SOCIAL.</h1>
          <p>Please create an account and join us at kev socials</p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type='text' placeholder='Username' name='username' onChange={handleChange}/>
            <input type='email' placeholder='Email' name='email' onChange={handleChange}/>
            <input type='password' placeholder='Password' name='password' onChange={handleChange}/>
            <input type='text' placeholder='Name' name='name' onChange={handleChange}/>
            <button onClick={handleClick}>Register</button>            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;