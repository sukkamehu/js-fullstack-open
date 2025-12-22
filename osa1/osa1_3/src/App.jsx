import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.good + props.neutral + props.bad} />
          <StatisticsLine text='average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
          <StatisticsLine text='positive' value={(props.good / (props.good + props.neutral + props.bad)) * 100 + ' %'} />
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

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral before:', neutral)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
      </div>
      <h1>statistics</h1>
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  )
}

export default App