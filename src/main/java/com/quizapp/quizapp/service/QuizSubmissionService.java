package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.AnswerRequest;
import com.quizapp.quizapp.dto.request.QuizSubmissionRequest;
import com.quizapp.quizapp.dto.response.QuizResultResponse;
import com.quizapp.quizapp.entity.Question;
import com.quizapp.quizapp.entity.Quiz;
import com.quizapp.quizapp.entity.QuizAttempt;
import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.QuestionRepository;
import com.quizapp.quizapp.repository.QuizAttemptRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import com.quizapp.quizapp.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service 
public class QuizSubmissionService {

    private QuestionRepository questionRepo;
    private QuizRepository quizRepo;
    private QuizAttemptRepository quizAttemptRepo;
    private UserRepository userRepo;
    public QuizSubmissionService(QuestionRepository questionRepo, QuizRepository quizRepo, 
                                QuizAttemptRepository quizAttemptRepo, UserRepository userRepo) {
        this.questionRepo = questionRepo;
        this.quizRepo = quizRepo;
        this.quizAttemptRepo = quizAttemptRepo;
        this.userRepo = userRepo;
    }
    

    // Check score and percentage
    public QuizResultResponse submitQuiz(QuizSubmissionRequest request) {

        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(
                                        "Authenticated user not found"
                                        ));

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

        // Calculate result
        int totalQs = questions.size();
        int wrongAnswers = totalQs - correctAnswers;
        double percentage = ((double) correctAnswers / totalQs) * 100;

        // Save attempt
        QuizAttempt attempt = QuizAttempt.builder()
                                .quiz(quiz)
                                .user(user)
                                .totalQuestions(totalQs)
                                .wrongAnswers(wrongAnswers)
                                .score(correctAnswers)
                                .percentage(percentage)
                                .build();
        quizAttemptRepo.save(attempt);

        // Return result
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
