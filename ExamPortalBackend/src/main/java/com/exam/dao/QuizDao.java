package com.exam.dao;

import java.util.Set;

import com.exam.model.exam.Quiz;

public interface QuizDao {

	public Quiz addQuiz(Quiz quiz);

	public Quiz updateQuiz(Quiz quiz);

	public Set<Quiz> getQuizzes();

	public Quiz getQuiz(long quizId);

	public void deleteQuiz(Long quizId);

	public Set<Quiz> getQuizzesOfCategory(Long cId);
	
	public Set<Quiz> getAllActiveQuizzes();

	public Set<Quiz> getActiveQuizzesOfCategory(Long cId);
	
	
}
