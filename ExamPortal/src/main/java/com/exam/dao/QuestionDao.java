package com.exam.dao;

import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionDao {
	
	public Question addQuestion(Question question);

	public Question updateQuestion(Question question);

	public Set<Question> getQuestions();

	public Question getQuestion(long questionId);

	public Set<Question> getQuestionsOfQuiz(Quiz quiz);

}
