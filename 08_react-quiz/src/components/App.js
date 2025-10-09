// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Questions from "./Questions"

const initialState = {
  questions: [],

  // 'loading','error','ready','active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    default:
      throw new Error("unkown action")
  }
}

export default function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }))
  }, [])

  return <div className="app">
    <Header />
    <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
      {status === "active" && <Questions question={questions[index]} dispatch={dispatch} answer={answer} />}
    </Main>
  </div>
}
