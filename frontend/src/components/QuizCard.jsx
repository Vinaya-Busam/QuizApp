function QuizCard({ quiz, onStart }) {

    return (
        <div className="quiz-card">

            <div className="quiz-card-content">

                <span className="quiz-category">
                    {quiz.categoryName}
                </span>

                <h3>{quiz.title}</h3>

                <p className="quiz-description">
                    {quiz.description}
                </p>

                <div className="quiz-info">

                    <span>
                        ⏱ {quiz.timeLimit} minutes
                    </span>

                </div>

                <button
                    className="start-quiz-button"
                    onClick={() => onStart(quiz.id)}
                >
                    Start Quiz →
                </button>

            </div>

        </div>
    );
}

export default QuizCard;