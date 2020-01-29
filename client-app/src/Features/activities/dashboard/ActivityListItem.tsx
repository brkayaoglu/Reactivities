import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";




export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {

  const host = activity.attendees.filter(a => a.isHost)[0];
  return (
    <Segment>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={host.image} style={{marginBottom:3}} />
              <Item.Content>
                <Item.Header as={Link} to = {`/activities/${activity.id}`} >{activity.title}</Item.Header>
                <Item.Description>Hosted by<Link to={`/profile/${host.userName}`}> {host.displayName}</Link></Item.Description>
                {activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color="orange"
                      content="You are hosting this activity."
                    />
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color="green"
                      content="You are going to this activity."
                    />
                  </Item.Description>
                )}

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
          <Icon name="clock" /> {format(activity.date, "h:mm a")}
          <Icon name="marker" />
          {activity.venue}, {activity.city}
        </Segment>
        <Segment>
          <ActivityListItemAttendees attendees={activity.attendees} />
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
    </Segment>
  );
};
