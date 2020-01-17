import React, { useEffect, useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivitiesList from "./ActivitiesList";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../App/stores/activityStore'
import LoadingComponent from "../../../App/Layout/Loadingcomponent/LoadingComponent";

const ActivitiesDashboard: React.FC = () => {

  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.initialLoad)
    return <LoadingComponent content="Loading activities.." />;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList />
      </GridColumn>

      <GridColumn width={6}>
        Activity filter
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
