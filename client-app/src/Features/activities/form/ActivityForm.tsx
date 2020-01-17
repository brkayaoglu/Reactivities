import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
interface DetailParams {
  id:string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {

  const activityStore = useContext(ActivityStore);
  const {
    editActivity,
    createActivity,
    submitting,
    loadActivity,
    selectedActivity:initialFormState,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
  })

  useEffect(() => {
    
    if(match.params.id && activity.id.length === 0){
      loadActivity(match.params.id).then(()=>{
        initialFormState && 
        setActivity(initialFormState)
      })
    }
    return () => {
      clearActivity();
    }
  }, [loadActivity,clearActivity,initialFormState,match.params.id,activity.id.length])

  const handleEventChange = (
    event: FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
    } else {
      editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
    }
  };
  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          onChange={handleEventChange}
          name="title"
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          rows={2}
          onChange={handleEventChange}
          placeholder="Description"
          name="description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          onChange={handleEventChange}
          value={activity.date}
        ></Form.Input>
        <Form.Input
          placeholder="Category"
          onChange={handleEventChange}
          name="category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          onChange={handleEventChange}
          name="city"
          value={activity.city}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          onChange={handleEventChange}
          name="venue"
          value={activity.venue}
        ></Form.Input>
        <Button
          loading={submitting}
          positive
          floated="right"
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          onClick={()=> history.push('/activities')}
          color="grey"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer (ActivityForm);
