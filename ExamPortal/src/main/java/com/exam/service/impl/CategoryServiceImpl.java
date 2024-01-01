package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.dao.CategoryDao;
import com.exam.model.exam.Category;
import com.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	CategoryDao categoryDao;

	@Override
	public Category addCategory(Category category) {
		// TODO Auto-generated method stub
		return this.categoryDao.addCategory(category);
	}

	@Override
	public Category updateCategory(Category category) {
		// TODO Auto-generated method stub
		return this.categoryDao.updateCategory(category);
	}

	@Override
	public Set<Category> getCategories() {
		// TODO Auto-generated method stub
		return this.categoryDao.getCategories();
	}

	@Override
	public Category getCategory(Long categoryId) {
		// TODO Auto-generated method stub
		return this.categoryDao.getCategory(categoryId);
	}

	@Override
	public void deleteCategory(Long CategoryId) {
		// TODO Auto-generated method stub
		this.categoryDao.deleteCategory(CategoryId);
	}

}
