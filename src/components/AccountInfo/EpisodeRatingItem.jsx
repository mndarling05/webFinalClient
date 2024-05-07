import { useAuthContext } from '../../hooks/useAuthContext'
import {useRatingsContext} from '../../hooks/useRatingsContext'
import {useState, useEffect} from 'react'

const EpisodeRatingItem = ({rating}) => {
    const {dispatch} = useRatingsContext()
    const {user} = useAuthContext()
    const [episode, setEpisode] = useState({})

    useEffect(() => {
        const getEpisode = async () => {
            const response = await fetch(import.meta.env.VITE_EPISODES_API + rating.episode_id)

            const json = await response.json()

            if(response.ok && json.length > 0){
                setEpisode(json[0])
            }
        }
        if(user){
            getEpisode()
        }
    }, [rating.episode_id, user])

    const getSeasonNumber = (id) => {
        if(id)
        {
            let idString = id.toString();
            return idString.slice(0, 2);
        }
    }

    const getEpisodeNumber = (id) => {
        if(id){
            let idString = id.toString();
            idString = idString.slice(2)
            if(idString[0] == '0')
               idString = idString.slice(1)
            return idString;
        }
    }
    console.log(episode)
    return(
        <>
            <li><strong>{episode.title}:</strong></li>
                <ul>
                    <li><em>Season</em> {getSeasonNumber(episode.episode_id)} &#x2022; <em>Ep. </em> {getEpisodeNumber(episode.episode_id)}</li>
                    <li><strong>Your Rating: </strong>{rating.episode_rating}</li>
                </ul>
        </>
    )
}

export default EpisodeRatingItem