import {useState} from "react";

const Title = ({text}) => (
    <h1>{text}</h1>
)

const Button = (props) => (
    <button onClick={props.onClick}>
        {props.text}
    </button>
)

const Feedback = ({setGood, setNeutral, setBad}) => (
    <>
        <Title text="Give feedback"/>
        <Button text="good" onClick={setGood} />
        <Button text="neutral" onClick={setNeutral} />
        <Button text="bad" onClick={setBad} />
    </>
)

const StatisticLine = ({text, value}) => (
    <tr>
        <td>
            {text}
        </td>
        <td>
            {value}
        </td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const noFeedback = !good && !neutral && !bad
    const all = good + neutral + bad
    const avg = (all !== 0) ? (good - bad) / all : 0
    const positive = (all !== 0) ? good / all : 0
    return (<>
        <Title text="Statistics"/>
        {noFeedback ? <p>No feedback given</p> :
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={avg} />
                    <StatisticLine text="positive" value={positive} />
                </tbody>

            </table>}
    </>)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Feedback setGood={() => setGood(good + 1)}
                      setBad={() => setBad(bad + 1)}
                      setNeutral={() => setNeutral(neutral + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
