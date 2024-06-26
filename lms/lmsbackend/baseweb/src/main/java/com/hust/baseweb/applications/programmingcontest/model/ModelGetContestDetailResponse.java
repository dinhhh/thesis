package com.hust.baseweb.applications.programmingcontest.model;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class ModelGetContestDetailResponse implements Serializable {
    private String contestId;
    private String contestName;
    private long contestTime;
    private Date startAt;
    private List<ModelGetProblemDetailResponse> list;
    private boolean unauthorized;
    private Boolean isPublic;
    private String statusId;
    private String submissionActionType;
    private int maxNumberSubmission;
    private String participantViewResultMode;
    private String problemDescriptionViewType;
    private String useCacheContestProblem;
    private String evaluateBothPublicPrivateTestcase;
    private int maxSourceCodeLength;
    private long minTimeBetweenTwoSubmissions;
    private String judgeMode;
    private List<String> listStatusIds;
    private List<String> listSubmissionActionTypes;
    private List<String> listParticipantViewModes;
    private List<Integer> listMaxNumberSubmissions;
    private List<String> listProblemDescriptionViewTypes;
    private List<String> listUseCacheContestProblems;
    private List<String> listEvaluateBothPublicPrivateTestcases;
    private List<String> listJudgeModes;
}
