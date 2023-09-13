import { useState, useEffect } from 'react';
import Question from './Question';
import Home from './Home';
import { v4 as uuidv4 } from 'uuid';
import Confetti from "react-confetti";

export default function Quiz() {
    const [quiz, setQuiz] = useState(false)
    const [allQuestions, setAllQuestions] = useState([])
    const [gameOver, setGameOver] = useState(false)
    let [questionsAnswered, setQuestionsAnswered] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [formData, setFormData] = useState({
        difficulty: 'easy',
        category: 0
    })

    useEffect(() => {
        async function getQuestions() {
            try {
                const url = `https://opentdb.com/api.php?amount=3${formData.category === 0 ? '' : `&category=${formData.category}`}&difficulty=${formData.difficulty}&type=multiple`
                const res = await fetch(url)
                const data = await res.json()
                setAllQuestions(() => {
                    return data.results.map((item) => {
                        const incorrect = item.incorrect_answers.map(answer => {
                            return { value: answer, id: uuidv4(), isHeld: false, isCorrect: false };
                        });
                        const correct = { value: item.correct_answer, id: uuidv4(), isHeld: false, isCorrect: true };
                        let allAnswersArray = [...incorrect]
                        //put correct answer in random spot in the array
                        const randomNum = Math.floor(Math.random() * 4)
                        allAnswersArray.splice(randomNum, 0, correct);
                        return { ...item, allAnswers: allAnswersArray, id: uuidv4() }
                    })
                })
                setIsLoading(false)
            }
            catch (error) {
                return (console.log(error))
            }
        }

        if (quiz) {
            setIsLoading(true)
            setGameOver(false)
            setQuestionsAnswered(0)
            getQuestions()
        }
    }, [quiz, formData])

    function startQuiz(formSelections) {
        setQuiz(prevState => !prevState)
        setFormData(formSelections)
    }

    function clickAnswer(id, answerId) {
        setAllQuestions(prevQuizData => {
            return prevQuizData.map(question => {
                if (id !== question.id) return question;

                const newAnswers = question.allAnswers.map(answer => {
                    return answer.id === answerId
                        ? { ...answer, isHeld: !answer.isHeld }
                        : { ...answer, isHeld: false };
                })
                return { ...question, allAnswers: newAnswers };
            })
        })
    }


    useEffect(() => {
        //Check what questions have been answered
        setQuestionsAnswered(0)
        let count = 0
        allQuestions.map(question => {
            return question.allAnswers.map(answer => {
                if (answer.isHeld) {
                    return count++
                }
                else return answer
            })
        })
        setQuestionsAnswered(count)
    }, [allQuestions])


    function checkAnswers() {
        setScore(0)
        if (!gameOver) {
            allQuestions.map((prevState) => {
                return prevState.allAnswers.forEach(element => {
                    if (element.isHeld && element.isCorrect) {
                        setScore(prevScore => prevScore + 1)
                    }
                    return { ...element }
                })
            })
        }
        else {
            setQuiz(false)
        }
        setGameOver(true)
    }

    const questionElements = allQuestions.map((item) => {
        return <Question
            key={item.id}
            id={item.id}
            question={item.question}
            answers={item.allAnswers}
            toggleIsHeld={clickAnswer}
            gameOver={gameOver} />
    })

    return (
        <>
            {!quiz ?
                <Home startQuiz={startQuiz} />
                : isLoading ? <div className='loader'></div>
                    : <>
                        {score === allQuestions.length && <Confetti />}
                        {questionElements}
                        {gameOver && <p className="final_score">You scored {score}/{allQuestions.length} correct answers</p>}
                        {questionsAnswered >= allQuestions.length ?
                            <button
                                onClick={checkAnswers} className='submit-btn'>{gameOver ? "Play Again" : "Check Answers"}
                            </button>
                            :
                            <button className='submit-btn-disabled' disabled >Check Answers</button>
                        }
                    </>
            }
        </>
    )
}