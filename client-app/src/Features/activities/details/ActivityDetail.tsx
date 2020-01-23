import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../App/Layout/Loadingcomponent/LoadingComponent";
import  ActivityDetailedHeader  from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChatBar } from "./ActivityDetailedChatBar";
import  ActivityDetailedSideBar  from "./ActivityDetailedSideBar";
import { RootStoreContext } from "../../../App/stores/rootStore";

interface DetailParams {
  id:string
}

const ActivityDetail: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
  const rootStore = useContext(RootStoreContext); 
  const {
    selectedActivity: activity,
    loadActivity,
    initialLoad,
  } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id,history])

  if(initialLoad) return <LoadingComponent content="Loading activity..." />

  if(!activity){
    return <h2>Activity not found</h2>
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
        <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
        <ActivityDetailedChatBar></ActivityDetailedChatBar>
      </Grid.Column>
      <GridColumn width={6} >
        <ActivityDetailedSideBar attendees= {activity.attendees}/>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetail);
