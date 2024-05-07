import { useAuthContext } from '../../hooks/useAuthContext'
import {useContestantRatingsContext} from '../../hooks/useContestantRatingsContext'
import {useState, useEffect} from 'react'

const ContestantRatingItem = ({rating}) => {
    const {dispatch} = useContestantRatingsContext()
    const {user} = useAuthContext()
    const [contestant, setContestant] = useState({})

    useEffect(() => {
        const getContestant = async () => {
            const response = await fetch(import.meta.env.VITE_APP_API + '/api/contestants/' + rating.contestant_id)

            const json = await response.json()
            if(response.ok && json.length > 0){
                setContestant(json[0])
            }
        }
        if(user){
            getContestant()
        }
    }, [rating.contestant_id, user])

    return(
        <>
            <li><strong>{contestant.contestant_name}:</strong></li>
                <ul>
                    <li><strong>Your Rating: </strong>{rating.contestant_rating}</li>
                </ul>
        </>
    )
}

export default ContestantRatingItem