import {useState} from 'react';

const DisplayReviews = ({reviews}) => {
    return (    
        <div>
            <p>Good - {reviews.good}</p>
            <p>Neutral - {reviews.neutral}</p>
            <p>Bad - {reviews.bad}</p>
        </div>
    )
}

const Button = ({text, onClick}) => {
    return (
        <button onClick = {(e) => onClick(e)}>{text}</button>
    )
}

const App  = ()  => {

    const [reviews, setReviews] = useState({
        good: 0, 
        neutral: 0, 
        bad : 0
    });

    const handleClick = (e) => {
        const text = e.target.textContent;
        const newReviews = {
            ...reviews
        }
        newReviews[text]++;
        setReviews(newReviews);
        console.log(reviews);
    }

    return (
        <>
            <div className = "take-feedback">
                <h1>give feedback</h1>
                <Button text = "good" onClick = {handleClick} />
                <Button text = "neutral" onClick = {handleClick} />
                <Button text = "bad" onClick = {handleClick} />
            </div>

            <br></br>

            <h1>Statistics</h1>
            <DisplayReviews reviews = {reviews} />
        </>
    )
}

export default App;