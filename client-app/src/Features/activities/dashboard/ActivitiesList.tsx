import React, {  useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/activityStore";
import { Link } from "react-router-dom";

const ActivitiesList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    deleteActivity,
    targetButton,
    submitting
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>{activity.description}</Item.Description>
              <Item.Description>
                {activity.city}, {activity.venue}
              </Item.Description>
              <Item.Extra>
                <Label basic content={activity.category} />
                <Button
                  as = {Link} to = {`/activities/${activity.id}`}
                  content="View"
                  floated="right"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={targetButton === activity.id && submitting}
                  onClick={e => deleteActivity(e, activity.id)}
                  content="Delete"
                  floated="right"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivitiesList);
