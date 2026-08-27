package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.QuestionRequest;
import com.quizapp.quizapp.dto.response.QuestionResponse;
import com.quizapp.quizapp.dto.response.QuizQuestionResponse;
import com.quizapp.quizapp.entity.Question;
import com.quizapp.quizapp.entity.Quiz;
import com.quizapp.quizapp.exception.DuplicateResourceException;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.QuestionRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class QuestionService {

    private QuestionRepository questionRepo;
    private QuizRepository quizRepo;
    public QuestionService(QuestionRepository questionRepo, QuizRepository quizRepo) {
        this.questionRepo = questionRepo;
        this.quizRepo = quizRepo;
    }

    // Create Questions
    public QuestionResponse createQuestion(QuestionRequest request) {
        Quiz quiz = quizRepo.findById(request.getQuizId()).orElseThrow(() -> new ResourceNotFoundException(
                                "Quiz not found with id: " + request.getQuizId()));

        if (questionRepo.existsByQuizIdAndQuestionOrder(request.getQuizId(), request.getQuestionOrder())) {
            throw new DuplicateResourceException(
                "Question order " + request.getQuestionOrder() + " already exists in this quiz");
        }

        Question question = Question.builder()
                                    .questionText(request.getQuestionText())
                                    .optionA(request.getOptionA())
                                    .optionB(request.getOptionB())
                                    .optionC(request.getOptionC())
                                    .optionD(request.getOptionD())
                                    .correctOption(request.getCorrectOption())
                                    .questionOrder(request.getQuestionOrder())
                                    .quiz(quiz)
                                    .build();
        
        Question savedQuestion = questionRepo.save(question);
        return mapToResponse(savedQuestion);
    }

    // Get All Questions
    public List<QuestionResponse> getAllQuestions() {
        return questionRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Question By Id
    public QuestionResponse getQuestionById(Integer id) {
        Question question = questionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                                                    "Question not found with this id: " + id));
        return mapToResponse(question);
    }

    // Get Questions By Quiz Id For Admin
    public List<QuestionResponse> getQuestionsByQuiz(Integer quizId) {
        if(!quizRepo.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz not found with id: " + quizId);
        }

        return questionRepo.findByQuizIdOrderByQuestionOrderAsc(quizId)
                            .stream().map(this::mapToResponse).toList();
    }

    // Get Questions by Quiz Id for user
    public List<QuizQuestionResponse> getQuestionsForQuiz(Integer quizId) {
        if(!quizRepo.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz not found with id: " + quizId);
        }

        return questionRepo.findByQuizIdOrderByQuestionOrderAsc(quizId)
                .stream()
                .map(question -> QuizQuestionResponse.builder()
                        .id(question.getId())
                        .questionText(question.getQuestionText())
                        .optionA(question.getOptionA())
                        .optionB(question.getOptionB())
                        .optionC(question.getOptionC())
                        .optionD(question.getOptionD())
                        .quizTitle(question.getQuiz().getTitle())
                        .questionOrder(question.getQuestionOrder())
                        .build())
                .toList();
    }

    // Update Question
    public QuestionResponse updateQuestion(Integer id, QuestionRequest request) {
        Question question = questionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                                                    "Question not found with this id: " + id));
        Quiz quiz = quizRepo.findById(request.getQuizId()).orElseThrow(() -> new ResourceNotFoundException(
                                                    "Quiz not found with this id: " + request.getQuizId()));

        boolean quizChanged = !question.getQuiz().getId().equals(request.getQuizId());

        boolean orderChanged = !question.getQuestionOrder().equals(request.getQuestionOrder());

        if ((quizChanged || orderChanged) && questionRepo.existsByQuizIdAndQuestionOrder(
                        request.getQuizId(),
                        request.getQuestionOrder())) {
            throw new DuplicateResourceException(
                "Question order " + request.getQuestionOrder() + " already exists in this quiz");
        }

        question.setQuestionText(request.getQuestionText());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectOption(request.getCorrectOption());
        question.setQuestionOrder(request.getQuestionOrder());
        question.setQuiz(quiz);

        Question updatedQuestion = questionRepo.save(question);
        return mapToResponse(updatedQuestion);
    }

    // Delete Question
    public void deleteQuestion(Integer id) {
        Question question = questionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                                                    "Question not found with this id: " + id));

        questionRepo.delete(question);
    }

    // Helper function
    private QuestionResponse mapToResponse(Question question) {
        return QuestionResponse.builder()
                    .id(question.getId())
                    .questionText(question.getQuestionText())
                    .optionA(question.getOptionA())
                    .optionB(question.getOptionB())
                    .optionC(question.getOptionC())
                    .optionD(question.getOptionD())
                    .correctOption(question.getCorrectOption())
                    .questionOrder(question.getQuestionOrder())
                    .quizId(question.getQuiz().getId())
                    .quizTitle(question.getQuiz().getTitle())
                    .createdAt(question.getCreatedAt())
                    .updatedAt(question.getUpdatedAt())
                    .build();
    }
}
