import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useSignup} from '../../hooks/useSignup'

const Signup= () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[username, setUsername] = useState('')
    const[firstname, setFirstName] = useState('')
    const[lastname, setLastName] = useState('')

    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        // console.log('submitting', username, email, password, firstname, lastname)

        await signup(username, email, password, firstname, lastname)
    }
    return(
        <form className = 'signUp' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div id = 'signupForm'>
            <div id = 'formInput'>
            <label>First Name: </label>
            <input type='text' id='userFirstName' 
                name='userFirstName' 
                onChange={(e) => setFirstName(e.target.value)}/>
            <label>Last Name: </label>
            <input type='text' id='userLastName' 
                name='userLastName' 
                onChange={(e) => setLastName(e.target.value)}/>
            <label>Username: </label>
            <input type='text' id='username' 
                name='username' 
                onChange={(e) => setUsername(e.target.value)}/>      
            <label>Email: </label>
            <input type='email' id='userEmail' 
                name='userEmail' 
                onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input type='password' id='userPass' 
                name='userPass' 
                onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            <div id = 'formSubmit'>
                <button id='signupBtn' disabled={isLoading}>Sign Up</button><br></br>
                {error && <div className ='error'>{error}</div>}
                <p id = 'loginLink'>Already have an account?<br></br> <Link to = '/Login'>Log In</Link></p>
            </div>
        </div>
   </form>
    )
}

export default Signup