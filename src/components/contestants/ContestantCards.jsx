import { BsStarFill, BsStar } from "react-icons/bs"

const ContestantCards = props => {

    const contestantImage = (id) => {
        return import.meta.env.VITE_CONTESTANT_HEADSHOT_API  + id + '.jpg'
    }

    if(Object.keys(props.contestants).length > 0)
    {
        if(Array.isArray(props.contestants))
        {
            return(
                <div id = 'SummaryContestantCards'>
                    {props.contestants.map(contestant => (
                        <div key = {contestant._id} id='individualContestant' onMouseEnter={()=>props.getContestantId(contestant.contestant_id)} onMouseDown = {() => props.getId(contestant._id)}onClick = {props.getContestant}>
                            <img src={contestantImage(contestant.contestant_id)} title={contestant.contestant_name} alt = {contestant.contestant_name}/><br></br>
                            <span id='contestantCardName'>{contestant.contestant_name}</span><br></br>
                            <div id = 'rating'>
                                {Array.from({length: 5}).map((_, index) =>(
                                    <span key ={index}>
                                        {contestant.contestant_rating > index ? <BsStarFill/> : <BsStar/>}
                                    </span>
                                ))}
                            </div>
                        </div>    
                    ))}
                </div>
            )
        }
        else{
            return(
                console.log("Empty")
            )
        }
    }
}
export default ContestantCards