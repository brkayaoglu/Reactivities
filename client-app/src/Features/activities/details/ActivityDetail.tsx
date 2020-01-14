import React from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";

interface IProps {
    activity:IActivity;
    setEditMode: (editMode:boolean) => void;
    cancelSelectedActivity:(activity:IActivity | null) =>void;
}

export const ActivityDetail : React.FC<IProps> = ({activity, setEditMode,cancelSelectedActivity}) => {
  return (
    <Card fluid> 
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={ () => {
                setEditMode(true);
            }} basic color="blue" content="Edit" />
            <Button onClick={()=>cancelSelectedActivity(null)} basic color="red" content="Cancel" />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
