import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { useRatingsContext } from '../../hooks/useRatingsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

import EpisodeCards from './EpisodeCards'
import HistoryNav from '../common/HistoryNav'

const Episodes = () => {
    const location = useLocation()
    const episodes = location.state

    const {user} = useAuthContext
    const {ratings, dispatch} = useRatingsContext()

    const [id, setId] = useState(0)
    const [episodeId, setEpisodeId] = useState(0);
    const [chosenEpisode, setChosenEpisode] = useState({});
    const [pageHistory, setPageHistory] = useState([{link: '/Episodes', text: 'Seasons '}, {link: '/Episodes/Season16', text: 'Season 16 Episodes '}])
    const pageIndex = 1;
    
    const navigate = useNavigate();

    const getId = (_id) => {
        setId(_id)
    }

    const getEpisodeId =(episodeId) => {
        setEpisodeId(episodeId)
    }

    useEffect(() => {
        const fetchRatings = async () => {
            const response = await fetch(import.meta.env.VITE_APP_EPISODE_RATINGS + user.id, {
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

    const getEpisode = e => {
        let importurl = import.meta.env.VITE_EPISODES_API + id
        fetch(importurl)
        .then(response => response.json())
        .then(response => {
            if(response.length > 0){
                setChosenEpisode(response)
            } else {
                setChosenEpisode({
                    _id: null,
                    episode_id: null,
                    title: "",
                    air_date: "",
                    synopsis: "",
                    judges_panel: [],
                    maxi_challenge: "",
                    runway_theme: "",
                    lip_sync_song: {},
                    bottom_two:[],
                    eliminiated: "N/A",
                    maxi_challenge_winner: "",
                    rating: null  
                })
            }
            navigate('./Details', {state: response})
        })
        .catch(err => console.error(err));
    }
    
    //console.log(episodes)
    return(
        <>
            <HistoryNav pageHistory = {pageHistory} pageIndex={pageIndex}/>
            <h1>Season 16 Episodes</h1>
            <div id = 'EpisodeGrid'>
                <EpisodeCards episodes = {episodes} getId={getId} getEpisodeId={getEpisodeId} getEpisode = {getEpisode}/>
            </div>
        </>
    )
}

export default Episodes