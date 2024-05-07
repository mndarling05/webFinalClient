import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useLogin} from '../../hooks/useLogin'

const Login= () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[username, setUsername] = useState('')

    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await login(email, password, username)
    }
    return(
        <form id='userForm' onSubmit={handleSubmit}>
        <h2>Login</h2>
             <div id = 'loginForm'>
                 <div id = 'formInput'>
                 <label>Email: </label>
                 <input type='email' id='userEmail'
                    name='userEmail' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}/>
                 <label>Password: </label>
                 <input type='password' id='userPass' 
                    name='userPass' 
                    onChange = {(e) => setPassword(e.target.value)}
                    value={password}/>
                 </div>
                 <div id = 'formSubmit'>
                     <button id='loginBtn' disabled={isLoading}>Login</button><br></br>
                     {error && <div className = 'error'>{error}</div>}
                     <p id = 'signUpLink'>Don't have an account?<br></br> <Link to = '/Signup'>Sign Up</Link></p>
                 </div>
             </div>
        </form>
    )
}

export default Login;
