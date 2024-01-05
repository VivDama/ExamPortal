package com.exam.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.exam.model.exam.Quiz;

import jakarta.transaction.Transactional;

public interface QuizRepository extends JpaRepository<Quiz, Long>{

	@Modifying
    @Transactional
	@Query("DELETE FROM Quiz as q WHERE q.qId=:qId")
	public void deleteQuizById(@Param("qId") Long qId);

	@Query("FROM Quiz as q WHERE q.category.cId=:cId")
	public Set<Quiz> findByCategoryId(@Param("cId") Long cId);
	
	
	@Query("FROM Quiz as q WHERE q.category.cId=:cId and q.isActive=true")
	public Set<Quiz> findByCategoryIdAndActive(@Param("cId") Long cId);
	
	@Query("FROM Quiz as q WHERE q.isActive=true")
	public Set<Quiz> getAllActiveQuizzes();
}
