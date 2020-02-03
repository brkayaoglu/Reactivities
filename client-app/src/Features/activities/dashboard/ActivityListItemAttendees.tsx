import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../App/models/activity";

interface IProps {
  attendees: IAttendee[];
}

const styles = {
  borderColor:'orange',
  borderWidth: 2
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
 // console.log(attendees.map(attendee => attendee))
  return (
    <List horizontal>
      {attendees.map(attendee => (
        
        <List.Item key={attendee.userName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
                bordered
                style={attendee.following ? styles : null}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};
