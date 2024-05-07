import S16Img from '../../images/RDR16.png'

const SeasonCards = props => {
    return(
        <>
            <div className = 'seasonLinkBox' onClick = {props.getContestants}>
                <img className = 'season16Button' onClick = {props.getContestants} alt="Season 16" height = '300px' width = '300px' src={S16Img}/>
                <p>Season 16</p>
            </div>
        </>
    )
}

export default SeasonCards