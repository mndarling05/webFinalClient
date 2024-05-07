import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import HistoryNav from '../../common/HistoryNav'
import SeasonCards from './SeasonCards'

const Seasons = () => {
    const [contestants, setContestants] = useState({})
    const navigate = useNavigate();
    const [pageHistory, setPageHistory] = useState([{link:'/Contestants', text: 'Seasons '}])
    const pageIndex = 0;

    const getContestants = () => {

        let importurl = import.meta.env.VITE_CONTESTANTS_API;
        fetch(importurl)
        .then(response => response.json())
        .then(response => {
            if(response.length > 0){
                setContestants(response);
            } else {
                setContestants({
                    contestant_id: null,
                    contestant_name: null,
                    track_record: {},
                    contestant_rating: null 
                })
            }
            navigate('./Season16', {state: response})
        })
        .catch(err => console.error(err));
    }


    return(
        <>
        <HistoryNav pageHistory = {pageHistory} pageIndex = {pageIndex}/>
        <h1>Contestants</h1>
            <SeasonCards contestants={contestants} getContestants = {getContestants}/>
        </>
    )
}
export default Seasons