package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	QuestionService questionService;

	// add question
	@PostMapping("/")
	public ResponseEntity<Question> add(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}

	// update question
	@PutMapping("/")
	public ResponseEntity<Question> update(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}

	// get question
	@GetMapping("/")
	public ResponseEntity<?> questions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}

	// get single question
	@GetMapping("/{qId}")
	public Question getQuestion(@PathVariable("qId") Long qId) {
		return this.questionService.getQuestion(qId);
	}

	// get all questions of a quiz
	@GetMapping("quiz-get-all/{qId}")
	public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("qId") Long qId) {
		Quiz quiz = new Quiz();
		quiz.setqId(qId);
		return ResponseEntity.ok(this.questionService.getAllQuestionsOfQuiz(quiz));
	}

	// get random questions of a quiz
	@GetMapping("quiz-attempt/{qId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qId") Long qId) {
		return ResponseEntity.ok(this.questionService.getQuestionsForQuiz(qId));
	}

	// delete quiz
	@DeleteMapping("/{qId}")
	public void delete(@PathVariable("qId") Long qId) {
		this.questionService.deleteQuestion(qId);
	}

}
