import {useEffect} from 'react'
import { useRatingsContext } from '../../hooks/useRatingsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

import EpisodeRatingItem from './EpisodeRatingItem'

const EpisodeRatings = () => {
    const {ratings, dispatch} = useRatingsContext()
    const {user} = useAuthContext()

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

    return(
        <div id = 'episodeRatings'>
            <ul className="ratingsList">
                {ratings && ratings.map((rating) => (
                    <EpisodeRatingItem key={rating.episode_id} rating ={rating}/>
                ))}
            </ul>
        </div>
    )
}

export default EpisodeRatings