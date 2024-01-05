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

import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	//add quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> add (@RequestBody Quiz quiz){
		System.out.println("New quiz status: "+quiz.getIsActive());
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//update quiz
	@PutMapping("/")
	public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	//get quiz
	@GetMapping("/")
	public ResponseEntity<?> quizzes(){
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	//get active quizzes
	@GetMapping("/active")
	public ResponseEntity<?> activeQuizzes(){
		return ResponseEntity.ok(this.quizService.getAllActiveQuizzes());
	}
	
	//get single quiz
	@GetMapping("/{qId}")
	public Quiz quiz(@PathVariable("qId") Long qId) {
		return this.quizService.getQuiz(qId);
	}
	
	//delete quiz
	@DeleteMapping("/{qId}")
	public void delete(@PathVariable("qId") Long qId) {
		this.quizService.deleteQuiz(qId);
	}
	
	@GetMapping("/category/{cid}")
	public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cid") Long cId){
		return ResponseEntity.ok(this.quizService.getQuizzesOfCategory(cId));
	}
	
	@GetMapping("/category-active/{cid}")
	public ResponseEntity<?> getActiveQuizzesOfCategory(@PathVariable("cid") Long cId){
		return ResponseEntity.ok(this.quizService.getActiveQuizzesOfCategory(cId));
	}
}
