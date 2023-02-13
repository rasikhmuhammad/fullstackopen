import {useState} from 'react';

const StatisticLine = ({stat, text, unit}) => {
        return (
            <tbody>
                <tr>
                    <td>{text}</td>    
                    <td>{stat}</td>    
                    <td>{unit}</td>    
                </tr>
            </tbody>
        );
}

const Stats = ({reviews, total, avg, positive}) => {

    if(!total  > 0) {
        return (<p>No feedback</p>);
    } 
    else {
        return (
            <table>
                <StatisticLine stat = {reviews.good} text = "Good" />
                <StatisticLine stat = {reviews.neutral} text = "neutral" />
                <StatisticLine stat = {reviews.bad} text = "Bad" />
                <StatisticLine stat = {total} text = "total" />
                <StatisticLine stat = {avg} text = "Average" />
                <StatisticLine stat = {positive} text = "Positive" unit = "%" />
            </table>
        )
    }
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
            <Stats reviews = {reviews} total = {total} avg = {avg} positive = {positive} />
        </>
    )
}

export default App;