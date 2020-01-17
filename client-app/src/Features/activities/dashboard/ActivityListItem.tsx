import React, { useContext } from "react";
import { Item, Label, Button, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/activityStore";
import { Link } from "react-router-dom";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const activityStore = useContext(ActivityStore);
  const { deleteActivity, targetButton, submitting } = activityStore;
  return (
    <Segment.Group>
      <Segment>
          <Item.Group>
          <Item>
          <Item.Image size="tiny" circular src="/assets/user.png" />
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Description>Hosted by Bob</Item.Description>
              {/* <Button
            name={activity.id}
            loading={targetButton === activity.id && submitting}
            onClick={e => deleteActivity(e, activity.id)}
            content="Delete"
            floated="right"
            color="red"
          /> */} 
          </Item.Content>
        </Item>
          </Item.Group>
        
      </Segment>
      <Segment>
          <Icon name='clock' /> {activity.date}
          <Icon name='marker'/> {activity.venue}, {activity.date}
      </Segment>
      <Segment>
          Attendees wiil go here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
                as={Link}
                to={`/activities/${activity.id}`}
                content="View"
                floated="right"
                color="blue"
              />
      </Segment>
    </Segment.Group>
  );
};
