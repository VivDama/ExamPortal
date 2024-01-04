package com.exam.service;

import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getQuestions();
	
	public Question getQuestion(long questionId);
	
	public Set<Question> getAllQuestionsOfQuiz(Quiz quiz);
	
	public Set<Question> getQuestionsForQuiz(Long quizId);
	
	public void deleteQuestion(Long questionId);

}
