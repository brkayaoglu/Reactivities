import React, { useEffect, Fragment, useContext } from "react"; //Fragments prevents siblings
import { Container } from "semantic-ui-react";
import { Navbar } from "../../Features/nav/Navbar";
import ActivitiesDashboard from "../../Features/activities/dashboard/ActivitiesDashboard";
import LoadingComponent from "./Loadingcomponent/LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

// interface IState  // we set an interface to set rule to a state
// {
//   activities:IActivity[]  //now it should be an activity array
// }

const App = () => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.initialLoad)
    return <LoadingComponent content="Loading activities.." />;

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
