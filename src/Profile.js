import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect,useState } from 'react'

function Profile() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://api.nitirat.co.th/user/profile", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === 'OK'){
                setUser(result.data)
                setIsLoaded(false)
            }else if(result.message  === 'forbidden'){
                MySwal.fire({
                    html: <i>Login Fail!!</i>,
                    icon: 'error'
                  }).then((value) => {
                    navigate('/')
                  })
                
            }
            
            console.log(result)
        })
        .catch(error => console.log('error', error));
      }, [])

      const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
      }

      if(isLoaded)
      return(
        <div>Loading</div>
      )
      else{
        console.log("user",user)
         return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <h3 className="text-2xl font-bold text-center">Profile</h3>
                    <form action="">
                        <div className="mt-4">
                            <div>
                                Username : {user.username}<br/>
                                Nickname : {user.nickname}<br/>
                                Team : {user.team}<br/>
                                Role : {user.role}<br/>
                            </div>
                            <div className="flex items-baseline justify-center">
                                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
        
    )
    }
   
}

export default Profile