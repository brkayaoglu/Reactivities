import React, { useState, useEffect, Fragment, SyntheticEvent } from "react"; //Fragments prevents siblings
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { Navbar } from "../../Features/nav/Navbar";
import { ActivitiesDashboard } from "../../Features/activities/dashboard/ActivitiesDashboard";
import agent from "../api/agent";
import LoadingComponent from "./Loadingcomponent/LoadingComponent";

// interface IState  // we set an interface to set rule to a state
// {
//   activities:IActivity[]  //now it should be an activity array
// }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const [selectedActivity, selectActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const [loading,setLoading] = useState(true);

  const [submitting,setSubmitting] = useState(false);

  const [task,setTask] = useState('');

  const handleSelectActivity = (id: string) => {
    selectActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const openCreateActivity = () => {
    selectActivity(null);
    setEditMode(true);
  };

  const createActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      selectActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false));
  };

  const editActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      selectActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false));
  };

  const deleteActivity = (e:SyntheticEvent<HTMLButtonElement>,id: string) => {
    setTask(e.currentTarget.name)
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(()=>setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    }).then(()=> setLoading(false));
  }, []);
  if(loading)
    return <LoadingComponent content="Loading activities.." />

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
          editMode={editMode}
          setEditMode={setEditMode}
          cancelSelectedActivity={selectActivity}
          createActivity={createActivity}
          editActivity={editActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
          task={task}
        />
      </Container>
    </Fragment>
  );
};

export default App;
