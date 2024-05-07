import {useState} from 'react'
import { useRatingsContext } from './useRatingsContext'
import { useAuthContext } from './useAuthContext'

export const useEpisodeRatings = () => {
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch} = useRatingsContext()
    const {user} = useAuthContext()

    const rateEpisode = async(userId, episodeId, episodeRating) => {
        setIsLoading(true)
        setError(true)

        const response = await fetch(import.meta.env.VITE_EPISODE_API , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({userId, episodeId, episodeRating})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('ratings', JSON.stringify(json))

            dispatch({type:'CREATE_RATING', payload: json})
            setIsLoading(false)
        }
    }
    return{rateEpisode, isLoading, error}
}