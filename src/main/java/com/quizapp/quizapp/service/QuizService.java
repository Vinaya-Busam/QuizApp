package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.QuizRequest;
import com.quizapp.quizapp.dto.response.QuizResponse;
import com.quizapp.quizapp.entity.Category;
import com.quizapp.quizapp.entity.Quiz;
import com.quizapp.quizapp.exception.DuplicateResourceException;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.CategoryRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class QuizService {

    private QuizRepository quizRepo;
    private CategoryRepository categoryRepo;
    public QuizService(QuizRepository quizRepo, CategoryRepository categoryRepo) {
        this.quizRepo = quizRepo;
        this.categoryRepo = categoryRepo;
    }


    // Get all Quizzes
    public List<QuizResponse> getAllQuizzes() {

        return quizRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Create Quiz
    public QuizResponse createQuiz(QuizRequest request) {
        Category category = categoryRepo.findById(request.getCategoryId())
                            .orElseThrow(() -> new 
                            ResourceNotFoundException(
                                "Category not found with this id: " + request.getCategoryId()
                            ));

        if(quizRepo.existsByTitleAndCategoryId(request.getTitle(), request.getCategoryId())) {
            throw new DuplicateResourceException("Quiz already exists in this category");
        }

        Quiz quiz = Quiz.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .category(category)
                    .timeLimit(request.getTimeLimit())
                    .build();
        Quiz savedQuiz = quizRepo.save(quiz);
        
        return mapToResponse(savedQuiz);
    }

    // Get Quiz by Id
    public QuizResponse getQuizById(Integer id) {
        Quiz quiz = quizRepo.findById(id).orElseThrow(() -> 
                                        new ResourceNotFoundException(
                                            "Quiz not found with this id: " + id)
                                        );
        
        return mapToResponse(quiz);
    }


    // Get Quizzes by Category
    public List<QuizResponse> getQuizzesByCategory(Integer categoryId) {
        if(!categoryRepo.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with this id: " + categoryId);
        }

        return quizRepo.findByCategoryId(categoryId)
                                .stream().map(this::mapToResponse).toList();
    }


    // Update Quiz
    public QuizResponse updateQuiz(Integer id, QuizRequest request) {
        Quiz quiz = quizRepo.findById(id).orElseThrow(() -> 
                                            new ResourceNotFoundException("Quiz not found with this id: " + id));
        
        Category category = categoryRepo.findById(request.getCategoryId())
                                        .orElseThrow(() -> 
                                            new ResourceNotFoundException(
                                                "Category not found with this id: " + request.getCategoryId()
                                            ));

        if(!quiz.getTitle().equals(request.getTitle())
            || !quiz.getCategory().getId().equals(request.getCategoryId()) 
            && quizRepo.existsByTitleAndCategoryId(request.getTitle(), request.getCategoryId())) {
                throw new DuplicateResourceException("Quiz already exists in this category");
        }

        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCategory(category);
        quiz.setTimeLimit(request.getTimeLimit());

        Quiz updatedQuiz = quizRepo.save(quiz);

        return mapToResponse(updatedQuiz);
    }

    // Delete Quiz
    public void deleteQuiz(Integer id) {
        Quiz quiz = quizRepo.findById(id)
                            .orElseThrow(() ->
                                new ResourceNotFoundException( "Quiz not found with id: " + id));

        quizRepo.delete(quiz);
    }


    // Helper function
    private QuizResponse mapToResponse(Quiz quiz) {
        return QuizResponse.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .categoryId(quiz.getCategory().getId())
                .categoryName(quiz.getCategory().getName())
                .timeLimit(quiz.getTimeLimit())
                .createdAt(quiz.getCreatedAt())
                .updatedAt(quiz.getUpdatedAt())
                .build();
    }

}
