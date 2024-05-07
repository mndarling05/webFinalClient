import S16Img from '../../images/RDR16.png'

const SeasonCards = props => {
    return(
        <>
            <div className = 'seasonLinkBox' onClick = {props.getEpisodes}>
                <img className = 'season16Button' onClick = {props.getEpisodes} alt="Season 16" height = '300px' width = '300px' src={S16Img}/>
                <p>Season 16</p>
            </div>
        </>
    )
}

export default SeasonCards