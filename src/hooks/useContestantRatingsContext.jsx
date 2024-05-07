import { ContestantRatingsContext } from "../context/ContestantRatingsContext"
import { useContext } from "react"

export const useContestantRatingsContext = () => {
    const context = useContext(ContestantRatingsContext)

    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    return context
}