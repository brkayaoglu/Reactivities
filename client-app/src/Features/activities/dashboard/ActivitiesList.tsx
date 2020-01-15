import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity:(e:SyntheticEvent<HTMLButtonElement> ,id:string) => void;
  submitting:boolean;
  task:string;
}

export const ActivitiesList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  task
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
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
                  onClick={() => {
                    selectActivity(activity.id);
                  }}
                  content="View"
                  floated="right"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={task===activity.id && submitting}
                  onClick={(e) => {
                    deleteActivity(e,activity.id);
                  }}
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
