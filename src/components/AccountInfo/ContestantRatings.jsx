import {useState, useEffect} from 'react'
import { useContestantRatingsContext } from '../../hooks/useContestantRatingsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

import ContestantRatingItem from './ContestantRatingItem'

const ContestantRatings = () => {
    const {ratings, dispatch} = useContestantRatingsContext()
    const {user} = useAuthContext()

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

    return(
        <div id = 'contestantRatings'>
            <ul className="ratingsList">
                {ratings && ratings.map((rating) => (
                    <ContestantRatingItem key = {rating.contestant_id} rating={rating}/>
                ))}
            </ul>
        </div>
    )
}

export default ContestantRatings