package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.CategoryRequest;
import com.quizapp.quizapp.dto.response.CategoryResponse;
import com.quizapp.quizapp.entity.Category;
import com.quizapp.quizapp.exception.DuplicateResourceException;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepo;
    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    // Create Category
    public CategoryResponse createCategory(CategoryRequest request) {
        if(categoryRepo.existsByName(request.getName())) {
            throw new DuplicateResourceException("Category already exists");
        }

        Category category = Category.builder()
                            .name(request.getName())
                            .description(request.getDescription())
                            .build();

        Category saved = categoryRepo.save(category);

        return mapToResponse(saved);
    }

    // Get all Categories
    public List<CategoryResponse> getAllCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Category By Id
    public CategoryResponse getCategoryById(Integer id) {
        Category category = categoryRepo.findById(id)
                                        .orElseThrow(() -> 
                                                    new ResourceNotFoundException("Category not found with id: " + id));
        
        return mapToResponse(category);
    }

    // Update Category
    public CategoryResponse updateCategory(Integer id, CategoryRequest request) {
        Category category = categoryRepo.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        
        if (!category.getName().equals(request.getName()) && 
                categoryRepo.existsByName(request.getName())) {
            throw new RuntimeException("Category already exists");
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepo.save(category);

        return mapToResponse(updatedCategory);
    }

    // Delete Category
    public void deleteCategory(Integer id) {
        Category category = categoryRepo.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepo.delete(category);
    }



    // Helper function
    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
