import {useAuthContext} from './useAuthContext'
import {useRatingsContext} from './useRatingsContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch:ratingsDispatch} = useRatingsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        ratingsDispatch({type: 'SET_THINGS', payload: null})
    }

    return {logout}
}