import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import { BsStarFill, BsStar } from "react-icons/bs"

import { useAuthContext } from '../../hooks/useAuthContext'
import { useContestantRatingsContext } from '../../hooks/useContestantRatingsContext'
import { useContestantRatings } from '../../hooks/useContestantRatings'

import HistoryNav from '../common/HistoryNav'
import StarRating from '../episodes/StarRatingItem'

const DetailedContestants = () => {
    const location = useLocation()
    const contestant = location.state.currentContestant ? location.state.currentContestant[0] : null
    const allContestants = location.state.allContestants

    const [pageHistory, setPageHistory] = useState([{link:'/Contestants', text: 'Seasons'}, {link:'.', text: 'Season 16 Contestants', state: allContestants}, {link: '/Contestants/Season16/Details', text: 'Contestant Details'}])
    const pageIndex = 2;

    const {user} = useAuthContext()
    const {ratings, dispatch} = useContestantRatingsContext()
    const [userRating, setUserRating] = useState()

    const {rateContestant} = useContestantRatings()

    const contestantImage = (id) => {
        return import.meta.env.VITE_CONTESTANT_FULLBODY_API + id + '.png'
    }

    const handleClick = async(rating) => {
        if(!user){
            alert("Log in to rate episodes")
            
        }
        else{
            await rateContestant(user.id, contestant._id, rating)
        }
    }

    useEffect(() => {
        if(user){
            let rating = ratings.find(rating => rating.contestant_id === contestant._id)?.contestant_rating
            setUserRating(rating)
        }
    }, [user, dispatch])
    
    if(Object.hasOwn(contestant, '_id'))
    {
        return(
            <>
                <HistoryNav pageHistory = {pageHistory} pageIndex = {pageIndex}/>
                <div id = 'ratings'>
                    <div id = 'overallRating'>
                        {Array.from({length: 5}).map((_, index) =>(
                            <span key ={index}>
                                {contestant.contestant_rating > index ? <BsStarFill/> : <BsStar/>}
                            </span>
                        ))}
                    </div>
                    <div id = 'userRating'>
                        <span className='ratingLabel'> Your Rating: </span>
                            <StarRating value={userRating} onClick={handleClick}/>
                    </div>
                </div>
                <div id = 'ContestantDetails'>
                    <img src = {contestantImage(contestant.contestant_id)}/>
                    <div id = 'ContestantInfo'>
                    <span id='contestantName'>{contestant.contestant_name}</span>
                    <span id='trackRecordLabel'>Track Record:</span>
                        <div id = 'trackRecordData'>
                            {Object.keys(contestant.track_record).map(key => {
                                if(key == 'episodes_won')
                                    return <div key = {key}><span className='trackLabel'>Episodes Won: </span><span id = 'trackData'>{contestant.track_record[key]}</span><br></br></div>
                                if(key == 'position')
                                    return <div key = {key}> <span className='trackLabel'>Place: </span><span id = 'trackData'>{contestant.track_record[key]}</span><br></br></div>
                                else
                                    return <div key = {key}><span className='trackLabel'>Episode Eliminated: </span><span id = 'trackData'>{contestant.track_record[key]}</span><br></br></div>
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default DetailedContestants