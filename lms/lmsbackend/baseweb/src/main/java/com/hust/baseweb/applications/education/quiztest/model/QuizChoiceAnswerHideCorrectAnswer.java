package com.hust.baseweb.applications.education.quiztest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuizChoiceAnswerHideCorrectAnswer {
    private UUID choiceAnswerId;
    private String choiceAnswerCode;
    private String choiceAnswerContent;
}
