import React, { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Display = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Average = ({ text, total, all }) => {
  const calculated = function(total, all) {
    if (all === 0) {
      return 0
    }
    return total / all
  }

  return (
    <Display text={text} value={calculated(total,all)} />
  )
}

const Positive = ({ text, positive, all }) => {
  const calculated = function(positive, all) {
    if (all === 0) {
      return 0
    }
    return positive / all * 100
  }

  return (
    <Display text={text} value={calculated(positive,all)} />
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
      <Header header="statistics" />
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={all} />
      <Average text="average" total={good + (-1 * bad)} all={all} />
      <Positive text="positive" positive={good} all={all} />
    </div>
  )
}

export default App