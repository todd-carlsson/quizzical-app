import he from 'he';

export default function Question(props) {
    function gameOverStyles(item) {
        if(item.isCorrect && item.isHeld) {
            return {
                backgroundColor: "#94D7A2"
            }
        }
        else if(item.isCorrect && !item.isHeld) {
            return {
                backgroundColor: "#94D7A2",
            }
        }
        else if(!item.isCorrect && item.isHeld) {
            return {
                backgroundColor: "#F8BCBC",
                opacity: 0.7
            }
        }
        else {
            return {
                backgroundColor: "#fff",
                opacity: 0.7
            }
        }
    }

    const answers = props.answers.map((item) => {
        if (props.gameOver === false) {
            return <div
                onClick={() => props.toggleIsHeld(props.id, item.id)}
                className='quiz_answer'
                style={{ backgroundColor: item.isHeld ? "#D6DBF5" : "#fff" }}
            >{he.decode(item.value)} </div>
        }
        else {
            return <div
                className='quiz_answer'
                style={gameOverStyles(item)}
            >{he.decode(item.value)} </div>
        }
    })

    return (
        <div className='quiz_section'>
            <h3 className='quiz_title'>{he.decode(props.question)}</h3>
            <div className='quiz_answer-container'>
                {answers}
            </div>
            <hr />
        </div>
    )
}