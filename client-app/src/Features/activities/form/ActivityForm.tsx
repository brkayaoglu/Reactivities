import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  IActivity,
  IActivityFormValues,
  ActivityFormValues
} from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../App/common/form/TextInput";
import { SelectInput } from "../../../App/common/form/SelectInput";
import { TextArea } from "../../../App/common/form/TextArea";
import { category } from "../../../App/common/options/categoryOptions";
import { DateInput } from "../../../App/common/form/DateInput";
import { combineDateAndTime } from "../../../App/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Category must be selected" }),
  description: composeValidators(
    isRequired("Description is required"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired({ message: "The city is required" }),
  venue: isRequired({ message: "The venue is required" }),
  date: isRequired({ message: "The event date is required" }),
  time: isRequired({ message: "The event time is required" })
});
interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const [loading, setLoading] = useState(false);
  const {
    editActivity,
    createActivity,
    submitting,
    loadActivity,
    selectedActivity: initialFormState,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => {
          setActivity(new ActivityFormValues(activity));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
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
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form loading={loading} onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  component={TextArea}
                  rows={3}
                  placeholder="Description"
                  name="description"
                  value={activity.description}
                />
                <Field
                  options={category}
                  placeholder="Category"
                  component={SelectInput}
                  name="category"
                  value={activity.category}
                />
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    name="date"
                    component={DateInput}
                    value={activity.date}
                    date={true}
                  />
                  <Field
                    placeholder="Time"
                    name="time"
                    time={true}
                    component={DateInput}
                    value={activity.date}
                  />
                </Form.Group>

                <Field
                  placeholder="City"
                  component={TextInput}
                  name="city"
                  value={activity.city}
                />
                <Field
                  placeholder="Venue"
                  component={TextInput}
                  name="venue"
                  value={activity.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  positive
                  floated="right"
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  floated="right"
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  color="grey"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
