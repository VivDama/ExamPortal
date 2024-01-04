package com.exam.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.exam.dao.QuestionDao;
import com.exam.dao.QuizDao;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@Service
public class QuestionServiceimpl implements QuestionService{
	
	@Autowired
	QuestionDao questionDao;
	
	@Autowired
	QuizDao quizDao;

	@Override
	public Question addQuestion(Question question) {
		// TODO Auto-generated method stub
		return this.questionDao.addQuestion(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		// TODO Auto-generated method stub
		return this.questionDao.updateQuestion(question);
	}

	@Override
	public Set<Question> getQuestions() {
		// TODO Auto-generated method stub
		return this.questionDao.getQuestions();
	}

	@Override
	public Question getQuestion(long questionId) {
		// TODO Auto-generated method stub
		return this.questionDao.getQuestion(questionId);
	}

	@Override
	public Set<Question> getAllQuestionsOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.questionDao.getAllQuestionsOfQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long questionId) {
		// TODO Auto-generated method stub
		this.questionDao.deleteQuestion(questionId);
		
	}

	@Override
	public Set<Question> getQuestionsForQuiz(Long quizId) {
		// TODO Auto-generated method stub
		Quiz quiz = this.quizDao.getQuiz(quizId);
		long questionCount = quiz.getQuestionCount();
		Set<Question> questions = quiz.getQuestions();		
		List<Question> questionList = new ArrayList(questions);
		Collections.shuffle(questionList);
		
		if(questionList.size()>(int)questionCount)
			questionList = questionList.subList(0, (int)questionCount);
		Set<Question> newSet = new HashSet<>(questionList);
//		Set<Question> newSet = new HashSet<>();
//		Random rand = new Random();
//		for (int i = 0; i < questionCount && questionList.size()>0 ; i++) {
//			 
//            // take a random index between 0 to size
//            // of given List
//            int randomIndex = rand.nextInt(questionList.size());
// 
//            // add element in temporary list
//            newSet.add(questionList.get(randomIndex));
// 
//            // Remove selected element from original list
//            questionList.remove(randomIndex);
//        }
		return newSet;
	}
}
