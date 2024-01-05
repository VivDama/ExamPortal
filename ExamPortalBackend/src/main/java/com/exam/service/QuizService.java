package com.exam.service;

import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.exam.model.exam.Quiz;

public interface QuizService {
	
	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Set<Quiz> getQuizzes();
	
	public Quiz getQuiz(long quizId);
	
	public void deleteQuiz(Long quizId);

	public Set<Quiz> getQuizzesOfCategory(Long cId);

	public Set<Quiz> getActiveQuizzesOfCategory(Long cId);
	
	public Set<Quiz> getAllActiveQuizzes();

}
