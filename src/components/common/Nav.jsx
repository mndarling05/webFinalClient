import {NavLink} from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useLogout} from '../../hooks/useLogout'

const Nav = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()


    const handleClick = () => {
        logout()
    }

    return(
        <>
                <section className = "navbar">
                    <nav>
                        <ul>
                            <li>
                                <NavLink className = 'navbar-link' to = '/' style={({ isActive }) => ({color: isActive ? '#f7f806' : '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink className = 'navbar-link' to = '/Episodes' style={({ isActive }) => ({color: isActive ? '#f7f806' : '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Episodes</NavLink>
                            </li>
                            <li>
                                <NavLink className = 'navbar-link' to = 'Contestants' style={({ isActive }) => ({color: isActive ? '#f7f806' : '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Contestants</NavLink>
                            </li>
                            <div id = 'accountLinks'>
                                <li>{!user && <NavLink className = 'navbar-link' to = "/Login" style={({ isActive }) => ({color: isActive ? '#f7f806' : '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Login</NavLink>}
                                </li>
                                <li>
                                    {!user && <NavLink className = 'navbar-link' to = "/Signup" style={({ isActive }) => ({color: isActive ? '#f7f806' : '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Sign Up</NavLink>}
                                </li>
                                    {user && (
                                <li>
                                    <NavLink className = 'navbar-link' to = "/MyAccount" style = {({isActive}) => ({color: isActive ? '#f7f806': '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>My Account</NavLink>
                                </li> )}
                                    {user && (
                                <li>
                                    <NavLink className = 'navbar-link' onClick={handleClick} to = "/Login" style = {({isActive}) => ({color: isActive ? '#f7f806': '#A7A7A7', fontSize: isActive ? '20px' : '18px', textDecoration: isActive ? 'underline' : 'none'})}>Sign Out</NavLink>
                                </li> )}
                            </div>
                        </ul>
                    </nav>
                </section>
        </>

    )
}
export default Nav