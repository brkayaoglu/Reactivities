import React, { useState, useEffect, Fragment } from "react"; //Fragments prevents siblings
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { Navbar } from "../../Features/nav/Navbar";
import { ActivitiesDashboard } from "../../Features/activities/dashboard/ActivitiesDashboard";

// interface IState  // we set an interface to set rule to a state
// {
//   activities:IActivity[]  //now it should be an activity array
// }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const [selectedActivity, selectActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    selectActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const openCreateActivity = () => {
    selectActivity(null);
    setEditMode(true);
  }

  const createActivity = (activity:IActivity) => {
    setActivities([...activities, activity]);
    selectActivity(activity);
    setEditMode(false);
  }
  
  const editActivity = (activity:IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id),activity])
    selectActivity(activity);
    setEditMode(false);
  }

  const deleteActivity = (id:string) => {
    setActivities([...activities.filter(a=> a.id !== id)]);
  }

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      //console.log(response);
      let activities:IActivity[] = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, []);

  // readonly state : IState = {
  //   activities:[]
  // }

  // componentDidMount = () => {
  //   axios.get("http://localhost:5000/api/activities")
  //     .then((response) => {
  //       //console.log(response);
  //       this.setState({
  //         activities:response.data
  //       })
  //     })
  // }

  return (
    <Fragment>
      <Navbar openCreateActivity={openCreateActivity} />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode = {editMode}
          setEditMode = {setEditMode}
          cancelSelectedActivity={selectActivity}
          createActivity = {createActivity}
          editActivity = {editActivity}
          deleteActivity = {deleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
