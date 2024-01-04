package com.exam.model.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="category_id")
	private Long cId;
	
	@Column(name="category_name")
	private String title;
	
	@Column(name="category_description",length = 1000)
	private String description;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY, mappedBy = "category")
	@JsonIgnore
	private Set<Quiz> quizzes  = new LinkedHashSet<>();
	

	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(String title, String description) {
		super();
		this.title = title;
		this.description = description;
	}

	public Long getCId() {
		return cId;
	}

	public void setCId(Long cId) {
		this.cId = cId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Quiz> getQuizzes() {
		return quizzes;
	}

	public void setQuizzes(Set<Quiz> quizzes) {
		this.quizzes = quizzes;
	}
	
	

}
