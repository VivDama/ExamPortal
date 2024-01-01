package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.dao.QuizDao;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {
	
	@Autowired
	QuizDao quizDao;

	@Override
	public Quiz addQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.quizDao.addQuiz(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.quizDao.updateQuiz(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		// TODO Auto-generated method stub
		return this.quizDao.getQuizzes();
	}

	@Override
	public Quiz getQuiz(long quizId) {
		// TODO Auto-generated method stub
		return this.quizDao.getQuiz(quizId);
	}

	@Override
	public void deleteQuiz(Long quizId) {
		// TODO Auto-generated method stub
		this.quizDao.deleteQuiz(quizId);
	}

}
