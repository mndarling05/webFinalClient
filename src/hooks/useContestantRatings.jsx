import {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useContestantRatingsContext } from './useContestantRatingsContext'

export const useContestantRatings = () => {
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch} = useContestantRatingsContext()
    const {user} = useAuthContext()

    const rateContestant = async(userId, contestantId, contestantRating) => {
        setIsLoading(true)
        setError(true)

        const response = await fetch(import.meta.env.VITE_CONTESTANT_API , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({userId, contestantId, contestantRating})
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
    return{rateContestant, isLoading, error}
}