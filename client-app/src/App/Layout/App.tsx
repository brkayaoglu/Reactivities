import React, { Fragment } from "react"; //Fragments prevents siblings
import { Container } from "semantic-ui-react";
import { Navbar } from "../../Features/nav/Navbar";
import ActivitiesDashboard from "../../Features/activities/dashboard/ActivitiesDashboard";
import { observer } from "mobx-react-lite";
import { HomePage } from "../../Features/home/HomePage";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetail from "../../Features/activities/details/ActivityDetail";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivitiesDashboard} />
              <Route path="/activities/:id" component={ActivityDetail} />
              <Route
                key={location.key}
                path={["/createactivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
