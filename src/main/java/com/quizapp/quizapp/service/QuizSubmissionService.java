package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.AnswerRequest;
import com.quizapp.quizapp.dto.request.QuizSubmissionRequest;
import com.quizapp.quizapp.dto.response.QuizResultResponse;
import com.quizapp.quizapp.entity.Question;
import com.quizapp.quizapp.entity.Quiz;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.QuestionRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service 
public class QuizSubmissionService {

    private QuestionRepository questionRepo;
    private QuizRepository quizRepo;
    public QuizSubmissionService(QuestionRepository questionRepo, QuizRepository quizRepo) {
        this.questionRepo = questionRepo;
        this.quizRepo = quizRepo;
    }
    

    // Check score and percentage
    public QuizResultResponse submitQuiz(QuizSubmissionRequest request) {

        // check whether quiz exists
        Quiz quiz = quizRepo.findById(request.getQuizId()).orElseThrow(() -> 
                                        new ResourceNotFoundException(
                                            "Quiz not found with this id: " + request.getQuizId())
                                        );
        
        // Get all question from this quiz
        List<Question> questions = questionRepo.findByQuizIdOrderByQuestionOrderAsc(request.getQuizId());

        if(questions.isEmpty()) {
            throw new ResourceNotFoundException("No questions found for this quiz");
        }

        // prevent duplicate question Ids in submission
        Set<Integer> answeredQIds = new HashSet<>();
        int correctAnswers = 0;

        // check submitted answer
        for(AnswerRequest answer : request.getAnswers()) {

            if(!answeredQIds.add(answer.getQuestionId())) {
                continue;
            }

            Question question = questionRepo.findById(answer.getQuestionId())
                                            .orElseThrow(() -> 
                                                new ResourceNotFoundException(
                                                    "Question not found with this id: " + answer.getQuestionId())
                                            );

            // Make sure the question belongs to this quiz                                
            if(!question.getQuiz().getId().equals(request.getQuizId())) {
                continue;
            }

            // Compare both answers 
            if(question.getCorrectOption().equalsIgnoreCase(answer.getSelectedOption())) {
                correctAnswers++;
            }
        }

        int totalQs = questions.size();
        int wrongAnswers = totalQs - correctAnswers;
        double percentage = ((double) correctAnswers / totalQs) * 100;
        return QuizResultResponse.builder()
                    .quizId(quiz.getId())
                    .quizTitle(quiz.getTitle())
                    .totalQuestions(totalQs)
                    .correctAnswers(correctAnswers)
                    .wrongAnswers(wrongAnswers)
                    .percentage(percentage)
                    .score(correctAnswers)
                    .build();
    }
}
