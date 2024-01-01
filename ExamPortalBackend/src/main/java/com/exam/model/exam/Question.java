package com.exam.model.exam;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="question_id")
	private Long quesId;
	
	@Column(name="question_content",length = 1000)
	private String content;
	
	@Column(name="question_image")
	private String image;
	
	@Column(name="question_option1",length = 1000)
	private String option1;
	
	@Column(name="question_option2",length = 1000)
	private String option2;
	
	@Column(name="question_option3",length = 1000)
	private String option3;
	
	@Column(name="question_option4",length = 1000)
	private String option4;
	
	@Column(name="question_answer")
	private int answer;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="quiz_qid", referencedColumnName = "quiz_id")
	private Quiz quiz;

	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Question(String content, String image, String option1, String option2, String option3, String option4,
			int answer, Quiz quiz) {
		super();
		this.content = content;
		this.image = image;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
		this.answer = answer;
		this.quiz = quiz;
	}

	public Long getQuesId() {
		return quesId;
	}

	public void setQuesId(Long quesId) {
		this.quesId = quesId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getOption1() {
		return option1;
	}

	public void setOption1(String option1) {
		this.option1 = option1;
	}

	public String getOption2() {
		return option2;
	}

	public void setOption2(String option2) {
		this.option2 = option2;
	}

	public String getOption3() {
		return option3;
	}

	public void setOption3(String option3) {
		this.option3 = option3;
	}

	public String getOption4() {
		return option4;
	}

	public void setOption4(String option4) {
		this.option4 = option4;
	}

	public int getAnswer() {
		return answer;
	}

	public void setAnswer(int answer) {
		this.answer = answer;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
	
	

}
