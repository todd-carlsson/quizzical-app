import { useState } from 'react';

export default function Home(props) {
    const [formData, setFormData] = useState({
        difficulty: 'easy',
        category: 0
    })

    function getFormValue(e) {
        const { name, value } = e.target
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    return (
        <>
            <h1 className='start-quiz_title'>Quizzical</h1>
            <p className='start-quiz_description'>Select a difficulty and category to start</p>
            <form>
                <select onChange={getFormValue} name="difficulty" id="difficulty-select">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select onChange={getFormValue} name="category" id="category-select">
                    <option value="0">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                </select>
            </form>
            <button onClick={() => props.startQuiz(formData)} className='start-quiz_btn'>Start Quiz</button>
        </>
    )
}