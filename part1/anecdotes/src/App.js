import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0,0,anecdotes.length));
  const [highest, setHighest] = useState(0);
  const [voted, setVoted] = useState(0);

  const findHighest = (voteArray) => {
    let high = 0;
    const original = [...voteArray];
    const sorted = voteArray.sort( (a,b) => {
      return a > b? -1: 1;
    });

    for (let i = 0; i < original.length; i++) {
      if(original[i] === sorted[0]) {
        high = i;
        break;
      }
    }

    return high;
  }
  
  const randomAnecdote = () => {
    const l = anecdotes.length;
    const newSelected = Math.floor(Math.random() * l);
    setSelected(newSelected);
  }

  const handleVote = () => {
    const temp = [...votes];
    const v = temp.map((vote, index) => {
      return index === selected? vote + 1: vote;
    });
    setVotes(v);

    const newHighest = findHighest([...v]);
    setHighest(newHighest);
    setVoted(voted + 1);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>

      <div>
        <button onClick = {handleVote}>Vote</button>
        <button onClick = {randomAnecdote}>next anecdote</button>
      </div>

      <h1>Anecdotes with most votes</h1>
      {voted >= 1 && <p>{anecdotes[highest]}</p>}
      {voted < 1 && <p>No votes cast</p>}
    </div>
  )
}

export default App