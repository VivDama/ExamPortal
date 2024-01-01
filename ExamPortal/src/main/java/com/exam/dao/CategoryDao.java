package com.exam.dao;

import java.util.Set;

import com.exam.model.exam.Category;

public interface CategoryDao {

	public Category addCategory(Category category);

	public Category updateCategory(Category category);

	public Set<Category> getCategories();

	public Category getCategory(Long categoryId);

	public void deleteCategory(Long CategoryId);

}
