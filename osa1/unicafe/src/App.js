import React, { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good,bad,neutral,all }) => {

  const average = function(good, bad, all) {
    if (all === 0) {
      return 0
    }

    let total = good + (-1 * bad)
    return total / all
  }

  const positive = function(positive, all) {
    if (all === 0) {
      return 0
    }
    return positive / all * 100
  }

  if (all === 0) {
    return(
      <div>
        <Header header="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header header="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average(good,bad,all)} />
          <StatisticLine text="positive" value={positive(good,all)} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const updateAllValue = () => {
    setAll(all + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    updateAllValue()
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    updateAllValue()
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    updateAllValue()
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App