import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Votes = ({ votes }) => {
  return (
    <p>has {votes} votes</p>
  )
}

const MostVotes = ({ votes, anecdotes }) => {
  const max_index = votes.indexOf(Math.max.apply(null,votes))
  console.log("Index of max votes ",max_index)

  return (
    <div>
      <Header header="Anecdote with most votes"/>
      <p>{anecdotes[max_index]}</p>
      <p>has {votes[max_index]} votes</p>
    </div>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0)) //[0,0,0,0,0,0,0])

  const getAnecdotesClick = () => {
    // Get a random integer from 0 to 6:
    const randomNumber = Math.floor(Math.random() * 7);
    setSelected(randomNumber) 
  }

  const handleVoteClick = () => {
    console.log(selected)

    // tilan päivittäminen kuuluu tehdä kopioimalla taulukko, ei muokkaamalla olemassa olevaa taulukkoa
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(copy)
  }

  return (
    <div>
      <Header header="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <Votes votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={getAnecdotesClick} text='next anecdote' />
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App