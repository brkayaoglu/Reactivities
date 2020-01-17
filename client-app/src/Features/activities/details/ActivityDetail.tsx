import React, { useContext, useEffect } from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import ActivityStore from "../../../App/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../App/Layout/Loadingcomponent/LoadingComponent";

interface DetailParams {
  id:string
}

const ActivityDetail: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    loadActivity,
    initialLoad,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id])

  if(initialLoad || !activity) return <LoadingComponent content="Loading activity..." />
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
            
            as={Link} to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/activities')}
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
