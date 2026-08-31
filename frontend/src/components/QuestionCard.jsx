function QuestionCard({
    question,
    selectedOption,
    onOptionSelect
}) {

    return (
        <div className="question-card">

            <div className="take-question-number">
                Question {question.questionOrder}
            </div>

            <h2 className="question-text">
                {question.questionText}
            </h2>

            <div className="options-container">

                <label
                    className={`option ${
                        selectedOption === "A" ? "selected" : ""
                    }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="A"
                        checked={selectedOption === "A"}
                        onChange={() => onOptionSelect("A")}
                    />

                    <span>{question.optionA}</span>
                </label>


                <label
                    className={`option ${
                        selectedOption === "B" ? "selected" : ""
                    }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="B"
                        checked={selectedOption === "B"}
                        onChange={() => onOptionSelect("B")}
                    />

                    <span>{question.optionB}</span>
                </label>


                <label
                    className={`option ${
                        selectedOption === "C" ? "selected" : ""
                    }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="C"
                        checked={selectedOption === "C"}
                        onChange={() => onOptionSelect("C")}
                    />

                    <span>{question.optionC}</span>
                </label>


                <label
                    className={`option ${
                        selectedOption === "D" ? "selected" : ""
                    }`}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="D"
                        checked={selectedOption === "D"}
                        onChange={() => onOptionSelect("D")}
                    />

                    <span>{question.optionD}</span>
                </label>

            </div>

        </div>
    );
}

export default QuestionCard;