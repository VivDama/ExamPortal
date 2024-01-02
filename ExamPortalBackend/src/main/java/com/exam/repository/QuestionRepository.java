package com.exam.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

import jakarta.transaction.Transactional;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	
	Set<Question> findByQuiz(Quiz quiz);
	
	@Modifying
    @Transactional
	@Query("DELETE FROM Question as q WHERE q.quesId=:qId")
	public void deleteQuestionById(@Param("qId") Long qId);

}
