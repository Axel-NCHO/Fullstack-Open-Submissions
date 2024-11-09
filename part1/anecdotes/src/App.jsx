import { useState } from 'react'

const Button = ({text, onClick}) => (
    <button onClick={onClick}>{text}</button>
)

const Title = ({text}) => (
    <h1>{text}</h1>
)

const Anecdote = (props) => (
    <>
        <Title text="Anecdote of the day"/>
        {props.anecdotes[props.selected]}
        <p>Has {props.votes[props.selected]} votes</p>
        <br/>
        <Button text="Vote" onClick={props.handleVote}/>
        <Button text="Next anecdote" onClick={props.handleNext}/>
    </>
)

const Popular = ({anecdotes, votes}) => {
    const noVote = votes.every(value => value === 0)

    const getPopular = () =>
        votes.reduce((maxIndex, currentValue, currentIndex, arr) =>
            currentValue > arr[maxIndex] ? currentIndex : maxIndex, 0)

    const popular = getPopular()

    return (
        <>
            <Title text="Anecdote with most votes"/>
            {noVote ? <p>No vote yet</p> :
                <>
                    {anecdotes[popular]}
                    <p>Has {votes[popular]} votes</p>
                </>
            }
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const getRandomInRange = (min, max) => {
        min = Math.ceil(min);   // Round up to the nearest integer
        max = Math.floor(max);   // Round down to the nearest integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleNext = () => setSelected(getRandomInRange(0, anecdotes.length - 1))
    const handleVote = (selected) => {
        const voteCopy = [...votes]
        voteCopy[selected] += 1
        setVotes(voteCopy)
    }

    return (
        <div>
            <Anecdote anecdotes={anecdotes}
                      votes={votes}
                      selected={selected}
                      handleVote={() => handleVote(selected)}
                      handleNext={handleNext} />

            <Popular anecdotes={anecdotes} votes={votes} />
        </div>
    )

}

export default App
