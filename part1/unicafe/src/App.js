import {useState} from 'react';

const DisplayStats = ({stats, text, unit}) => {
    return (    
            <p>{text} : {stats}{unit}</p>
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

    const [total, setTotal] = useState(0);
    const avg = (reviews.good - reviews.bad)/total;
    const positive = (reviews.good/total)*100;

    const handleClick = (e) => {
        const text = e.target.textContent;
        const newReviews = {
            ...reviews
        }
        newReviews[text]++;
        setReviews(newReviews);
        setTotal(total + 1);
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
            <DisplayStats stats = {reviews.good} text = "Good" />
            <DisplayStats stats = {reviews.neutral} text = "neutral" />
            <DisplayStats stats = {reviews.bad} text = "Bad" />
            <DisplayStats stats = {total} text = "total" />
            {total > 0 && <DisplayStats stats = {avg} text = "Average" />}
            {total === 0 && <DisplayStats stats = {0} text = "Average" />}
            {total > 0 && <DisplayStats stats = {positive} text = "Positive" unit = "%" />}
            {total === 0 && <DisplayStats stats = {0} text = "Positive" unit = "%" />}
        </>
    )
}

export default App;