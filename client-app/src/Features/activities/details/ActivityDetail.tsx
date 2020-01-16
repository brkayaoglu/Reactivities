import React, { useContext } from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import ActivityStore from "../../../App/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetail: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditMode,
    cancelSelectedActivity
  } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            onClick={() => {
              openEditMode(activity!);
            }}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedActivity}
            basic
            color="red"
            content="Cancel"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
