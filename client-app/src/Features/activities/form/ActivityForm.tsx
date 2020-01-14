import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  editActivity: (activity: IActivity) => void;
  createActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialize,
  editActivity,
  createActivity
}) => {
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
        <Button positive floated="right" type="submit" content="Submit" />
        <Button
          floated="right"
          onClick={() => setEditMode(false)}
          color="grey"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
