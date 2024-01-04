package com.exam.model.exam;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "quiz")
public class Quiz {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="quiz_id")
	private Long qId;
	
	@Column(name="quiz_title")
	private String title;
	
	@Column(name="quiz_description",length = 1000)
	private String description;
	
	@Column(name="quiz_max_marks")
	private int maxMarks;
	
	@Column(name="quiz_questions_count")
	private int questionCount;
	
	@Column(name="quiz_status")
	private boolean isActive = false;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="category_cid", referencedColumnName = "category_id")
	private Category category;
	
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,mappedBy = "quiz")
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();

	public Quiz() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Quiz(String title, String description, int maxMarks, int questionCount, boolean isActive) {
		super();
		this.title = title;
		this.description = description;
		this.maxMarks = maxMarks;
		this.questionCount = questionCount;
		this.isActive = isActive;
	}

	public Long getqId() {
		return qId;
	}

	public void setqId(Long qId) {
		this.qId = qId;
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

	public int getMaxMarks() {
		return maxMarks;
	}

	public void setMaxMarks(int maxMarks) {
		this.maxMarks = maxMarks;
	}

	public int getQuestionCount() {
		return questionCount;
	}

	public void setQuestionCount(int questionCount) {
		this.questionCount = questionCount;
	}

	@JsonProperty("isActive")
	public boolean getIsActive() {
		return isActive;
	}

	@JsonProperty("isActive")
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}
}
