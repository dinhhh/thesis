import React from "react";
import {Route, Switch, useRouteMatch} from "react-router";
import Notifications from "../component/dataadmin/Notifications";
import ViewCourseVideo from "../component/dataadmin/ViewCourseVideo";
import ViewLogUserDoPraticeQuizs from "../component/dataadmin/ViewLogUserDoPraticeQuizs";
import MainDashBoard from "../component/dataadmin/MainDashBoard";
import ViewProgrammingContestSubmission from "../component/dataadmin/ViewProgrammingContestSubmission";
import StudentLearningProfiles from "../views/dataadmin/viewlearningprofiles/StudentLearningProfiles";
import LearningProfileList from "../views/dataadmin/viewlearningprofiles/LearningProfileList";

export default function AdminRoute() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route
          component={Notifications}
          exact
          path={`${path}/notifications/list`}
        ></Route>
        <Route
          component={MainDashBoard}
          exact
          path={`${path}/dashboard/main`}
        ></Route>
        <Route
          component={ViewCourseVideo}
          exact
          path={`${path}/view-course-video/list`}
        ></Route>
        <Route
          component={ViewProgrammingContestSubmission}
          exact
          path={`${path}/view-programming-contest-submission/list`}
        ></Route>

        <Route
          component={ViewLogUserDoPraticeQuizs}
          exact
          path={`${path}/view-log-user-do-pratice-quiz/list`}
        ></Route>

        <Route path={`${path}/view-learning-profiles/users`}
               component={LearningProfileList}
               exact />
        <Route path={`${path}/view-learning-profiles/users/:studentLoginId`}
               component={StudentLearningProfiles}
               exact/>
      </Switch>
    </div>
  );
}
