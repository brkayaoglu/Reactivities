import React, { useEffect, useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivitiesList from "./ActivitiesList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/Loadingcomponent/LoadingComponent";
import { RootStoreContext } from "../../../App/stores/rootStore";

const ActivitiesDashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const {loadActivities,initialLoad} = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (initialLoad)
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
