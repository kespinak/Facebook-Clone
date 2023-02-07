import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';


const Login = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',    
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name] : e.target.value}));
    // console.log(inputs)
  };

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    // login(); used for frontend
    e.preventDefault()
    try {
      await login(inputs);
    } catch (err) {
      // console.log(err)
      setErr(err.response.data);
    }
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
            <input type='text' placeholder='Username' name='username' onChange={handleChange} />
            <input type='text' placeholder='Password' name='password' onChange={handleChange} />
            {err && err}
            {/* if there is error, then show error */}
            <button onClick={handleLogin}>Login</button>            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login