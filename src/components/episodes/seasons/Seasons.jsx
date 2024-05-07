import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import SeasonCards from './SeasonCards'
import HistoryNav from '../../common/HistoryNav'

const Seasons = () => {
    const [episodes, setEpisodes] = useState({})
    const navigate = useNavigate();
    const [pageHistory, setPageHistory] = useState([{link: '/Episodes', text: 'Seasons'}])
    const pageIndex = 0

    const getEpisodes = e => {
        let importurl = import.meta.env.VITE_EPISODES_API;
        fetch(importurl)
        .then(response => response.json())
        .then(response => {
            if(response.length > 0){
                setEpisodes(response);
            } else {
                setEpisodes({
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
            navigate('./Season16', {state: response})
        })
        .catch(err => console.error(err));
    }

    return(
        <>
            <HistoryNav pageHistory = {pageHistory} pageIndex={pageIndex}/>
            <h1>Episodes</h1>
            <SeasonCards episodes = {episodes} getEpisodes = {getEpisodes}/>
        </>
    )
}

export default Seasons