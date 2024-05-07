import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

import {format} from 'date-fns' //formatting date
import { BsStarFill, BsStar } from "react-icons/bs"

import { useAuthContext } from '../../hooks/useAuthContext'
import {useRatingsContext} from '../../hooks/useRatingsContext'
import { useEpisodeRatings } from '../../hooks/useEpisodeRatings'

import HistoryNav from '../common/HistoryNav';
import StarRating from './StarRatingItem'

const DetailedEpisodes = () => {
    const location = useLocation()
    const episode = location.state ? location.state[0] : null

    const[pageHistory] = useState([{link: '/Episodes', text: 'Seasons '}, {link: '/Episodes/Season16', text: 'Season 16 Episodes ', state: episode}, {link: '/Episodes/Season16/Details', text: 'Episode Details'}])
    const pageIndex = 2;

    const{user} = useAuthContext()
    const {ratings, dispatch} = useRatingsContext()
    const[userRating, setUserRating] = useState()

    const {rateEpisode} = useEpisodeRatings()

    const episodeImage = (id) => {
        return import.meta.env.VITE_EPISODE_IMAGE_API + id + '.jpg'
    }
    
    const handleClick = async(rating)=>{
        if(!user){
            alert("Log in to rate episodes")
        }
        await rateEpisode(user.id, episode._id, rating)
    }

    useEffect(() => {
        if(user){
            let rating = ratings.find(rating => rating.episode_id === episode._id)?.episode_rating
            setUserRating(rating)
        }
    }, [user, dispatch])

    if(Object.hasOwn(episode, '_id'))
    {
        return(
            <>
                <HistoryNav pageHistory = {pageHistory} pageIndex={pageIndex}/>
                <div id = 'ratings'>
                    <div id='overallRating'>
                    <span className='ratingLabel'> Overall Rating: </span>
                        {Array.from({length: 5}).map((_, index) =>(
                            <span id ='overallStars' key ={index}>
                                {episode.rating > index ? <BsStarFill/> : <BsStar/>}
                            </span>
                        ))}
                    </div>
                    <div id='userRating'>
                    <span className='ratingLabel'> Your Rating: </span>
                        <StarRating value={userRating} onClick={handleClick}/>
                    </div>
                </div>
                <div id = 'EpisodeDetails'>
                    <img src={episodeImage(episode.episode_id)}/>
                    <span id='title'>{episode.title}</span>
                    <span id = 'airDate'>{format(episode.air_date, 'LLL d, yyyy')}</span>
                    <span id = 'synopsis'>{episode.synopsis}</span>
                    <span id = 'judgesPanel'><strong>Judges Panel:</strong>
                        <ul>
                            {Object.keys(episode.judges_panel).map(key=>{
                                return <li key={key}> {episode.judges_panel[key]}</li>
                            })}
                        </ul>
                    </span>
                    <span><strong>Maxi Challenge: </strong>{episode.maxi_challenge}</span>
                    <span><strong>Runway Theme: </strong>{episode.runway_theme}</span>
                    <span><strong>Lip Sync Song:</strong>
                        <ul>
                            {Object.keys(episode.lip_sync_song).map(key=>{
                                if(episode.lip_sync_song[key] != "" || !episode.lip_sync_song[key] != null)
                                    if(key == 'artist')
                                        return <li key = {key}><strong>Artist: </strong><em>{episode.lip_sync_song[key]}</em></li>
                                    else
                                        return <li key = {key}><strong>Song: </strong><em>{episode.lip_sync_song[key]}</em></li>
                            })}
                        </ul>
                    </span>
                    <span><strong>Bottom Two:</strong>
                        <ul>
                        {Object.keys(episode.bottom_two).map(key=>{
                            if(episode.bottom_two[key] !== "" || episode.lip_sync_song[key] != null)
                                return <li key={key}> {episode.bottom_two[key]}</li>
                            else
                                return <li key ={key}>N/A</li>
                            })}
                        </ul>
                    </span>
                    <span><strong>Eliminated:</strong> {episode.eliminated}</span>
                    <span><strong>Maxi Challenge Winner:</strong> {episode.maxi_challenge_winner}</span>         
                </div>
            </>
        )
    }
}

export default DetailedEpisodes