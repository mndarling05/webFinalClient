import { useAuthContext } from '../../hooks/useAuthContext'
import EpisodeRatings from './EpisodeRatings'
import ContestantRatings from './ContestantRatings'

const Account = () => {
    const {user} = useAuthContext()
    console.log(user)
    if(user){
        return(
            <div className='account'>
                <div className='userInfo'>
                    <h2>{user.username}'s Ratings:</h2>
                </div>
                <div id = 'accountRatings'>
                    <div className= 'ratings'>
                    <h3>Episode Ratings: </h3>
                        <ul>
                            <EpisodeRatings/>
                        </ul>
                    </div>
                    <div className= 'ratings'>
                    <h3>Contestant Ratings:</h3>
                        <ul>
                            <ContestantRatings/>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account