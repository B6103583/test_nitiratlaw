import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});
    const MySwal = withReactContent(Swal)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "username": inputs.username,
        "password": inputs.password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://api.nitirat.co.th/auth/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.message === 'OK'){
                MySwal.fire({
                    html: <i>Login success!!</i>,
                    icon: 'success'
                  }).then((value => {
                    localStorage.setItem('token',result.data.access_token)
                    navigate('/profile')
                  }))
            }
            else{
                MySwal.fire({
                    html: <i>Login Fail!!</i>,
                    icon: 'error'
                  })
            }
        })
        .catch(error => console.log('error', error));
        
        console.log(inputs);
      }
  return (
    <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
                <label>Enter your Username:
                    <input 
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="text" 
                        name="username" 
                        value={inputs.username || ""} 
                        onChange={handleChange}
                    />
                    </label>
                    <label>Enter your Password:
                        <input 
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="password" 
                        name="password" 
                        value={inputs.password || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <div className="flex items-baseline justify-center">
                      <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"><input type="submit" /></button>
                  </div>

            </div>
                  
                  
        </div>
        <input type="submit" />
    </form>
  )
}

export default Login