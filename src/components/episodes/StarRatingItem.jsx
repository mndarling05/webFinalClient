import {useState, useEffect} from 'react'
import {BsStarFill, BsStar} from 'react-icons/bs'

const StarRating = ({value, onClick}) => {
    const max = 5
    const [hoverValue, setHoverValue] = useState() 
    const[userRating, setUserRating] = useState(value)

    const handleOver = (rating) => {
            setHoverValue(rating)
    }

    const handleLeave = () => {
            setHoverValue(userRating)
    }

    const handleClick = (index) => {
        setUserRating(index)
        onClick(index);
    }

    useEffect(() => {
        setUserRating(value)
    }, [value])

    return (
        <>
        {[...Array(max)].map((_, index) => (
            <span key={index} 
                onClick={()=>handleClick(index + 1)}
                onMouseOver={() => handleOver(index + 1)}
                onMouseLeave={handleLeave}>
                {hoverValue > index || userRating > index ? <BsStarFill /> : <BsStar/>}
            </span>
        ))}
        </>
    )
}

export default StarRating