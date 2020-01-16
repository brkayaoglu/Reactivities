import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity | null;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialize }) => {
  const initializeForm = () => {
    if (initialize) return initialize;
    else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

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
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  const activityStore = useContext(ActivityStore);
  const {
    editActivity,
    createActivity,
    submitting,
    cancelEditMode
  } = activityStore;
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
          onClick={cancelEditMode}
          color="grey"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer (ActivityForm);
