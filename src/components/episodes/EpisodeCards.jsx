import {format} from 'date-fns' //formatting date
import { BsStarFill, BsStar } from "react-icons/bs"

const EpisodeCards = props => {
    const episodeImage = (id) => {
        return 'https://webdev-stark.cs.kent.edu/~mdarlin4/FinalProjectImages/Episodes/' + id + '.jpg'
    }

    const getSeasonNumber = (id) => {
        let idString = id.toString();
         return idString.slice(0, 2);
    }

    const getEpisodeNumber = (id) => {
        let idString = id.toString();
        idString = idString.slice(2)
        if(idString[0] == '0')
           idString = idString.slice(1)
        return idString;
    }

    if(Object.keys(props.episodes).length > 0)
    {
        if(Array.isArray(props.episodes))
        {
            return(
                <div id='SummaryEpisodeCards'>
                    {props.episodes.map((episode) => (
                        <div key ={episode._id} id = 'individualEpisode' onMouseEnter = {() =>props.getEpisodeId(episode.episode_id)} onMouseDown={() => props.getId(episode._id)} onClick={props.getEpisode}>
                            <img width='384' height = '216' src={episodeImage(episode.episode_id)} title = {episode.title} alt={episode.title}/><br></br>
                            <div id= 'ratingTitleBlock'>
                            <span id='episodeId'>S{getSeasonNumber(episode.episode_id)} &#x2022; E{getEpisodeNumber(episode.episode_id)}</span>
                            <div id = 'rating'>
                                {Array.from({length: 5}).map((_, index) =>(
                                    <span key ={index}>
                                        {episode.rating > index ? <BsStarFill/> : <BsStar/>}
                                    </span>
                                ))}
                            </div>
                            </div>
                            <span id='Title'>{episode.title}</span>
                            <span id ='Synopsis'>{episode.synopsis}</span><br></br>
                            <span id='Date'>{format(episode.air_date, 'LLL d, yyyy')}</span>
                        </div>
                        ))}    
                </div>
            )
        }
        else
        {
            return(
                console.log("Empty")
            )
        }
    }

}

export default EpisodeCards