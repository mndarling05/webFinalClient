import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup= () =>{
    //state
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    //function from auth context
    const {dispatch} = useAuthContext()

    const signup = async(username, email, password, firstname, lastname) => {
        setIsLoading(true)
        setError(true)

        const response = await fetch(import.meta.env.VITE_SIGNUP_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password, firstname, lastname})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){

            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            const user_id = json.id;

            //update auth context
            dispatch({type:'LOGIN', payload:json})

            //creating new ratings item for new user
            await fetch(import.meta.env.VITE_RATINGS_API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_id})
            })

            setIsLoading(false)
        }
    }
    return{signup, isLoading, error}
}