import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import HistoryNav  from '../common/HistoryNav'
import ContestantCards from './ContestantCards'
import { useContestantRatingsContext } from '../../hooks/useContestantRatingsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const Contestants = () => {
    const location = useLocation()
    const contestants = location.state

    const [id, setId] = useState(0)
    const[contestantId, setContestantId] = useState(0)
    const[chosenContestant, setChosenContestant] = useState({})
    const [pageHistory, setPageHistory] = useState([{link:'/Contestants', text: 'Seasons '}, {link:'/Contestants/Season16', text: 'Season 16 Contestants '}])
    const {user} = useAuthContext()
    const {dispatch} = useContestantRatingsContext()
    const pageIndex = 1

    const navigate = useNavigate()

    const getId = (_id) => {
        setId(_id)
    }

    const getContestantId = (contestantId) => {
        setContestantId(contestantId)
    }

    useEffect(() => {
        const fetchRatings = async () => {
            const response = await fetch(import.meta.env.VITE_APP_CONTESTANT_RATINGS + user.id, {
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
        
            if(response.ok){
                dispatch({type: 'SET_RATING', payload: json})
            }

        }

        if(user){
            fetchRatings()
        }
    }, [dispatch, user])

    const getContestant = e => {
        let importurl = import.meta.env.VITE_CONTESTANTS_API + id
        fetch(importurl)
        .then(response => response.json())
        .then(response => {
            if(response.length > 0){
                setChosenContestant(response)
            } else {
                setChosenContestant({
                    contestant_id: null,
                    contestant_name: null,
                    track_record: {},
                    contestant_rating: null 
                })
            }
            navigate('./Details', {state: {currentContestant: response, allContestants: contestants}})
        })
        .catch(err => console.error(err))
    }

    return(
        <>
            <HistoryNav pageHistory = {pageHistory} pageIndex = {pageIndex}/>
            <h1>Season 16 Contestants</h1>
            <div id = 'ContestantGrid'>
                <ContestantCards contestants = {contestants} getId={getId} getContestantId={getContestantId} getContestant = {getContestant}/>
            </div>
        </>
    )
}
export default Contestants