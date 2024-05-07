import {NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const HistoryNav = (props) => {
    const navigate = useNavigate();
    const maxIndex = props.pageHistory.length - 1;

    return (
        <div id="historyNav">
            <nav>
                <ul>
                    {props.pageHistory.map((page, index) => (
                        <li key={index}>
                            {index === props.pageIndex ? (
                                <span id='lastElement'>{page.text}</span>
                            ) : (
                                    <NavLink to = {page.state ? '.' : page.link} 
                                        onClick = {(e) => {
                                            if(page.state){
                                                e.preventDefault()
                                                navigate(-1)
                                            }
                                        }} 
                                    >{page.text}/</NavLink>
                                )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default HistoryNav;