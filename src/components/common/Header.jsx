import {Outlet} from 'react-router-dom'

import Nav from './Nav'
const Header = () => {
    const HeaderImg = 'https://webdev-stark.cs.kent.edu/~mdarlin4/FinalProjectImages/Rupaul.jpg'
    const LogoImg = 'https://webdev-stark.cs.kent.edu/~mdarlin4/FinalProjectImages/Logo.png'

    return(
        <>
            <div className='header'>
                <img id='headerImg' src={HeaderImg}/>
                <img id='logoImg' src={LogoImg}/>
                <Nav/>
            </div>
        <Outlet/>
        </>

    )
}
export default Header