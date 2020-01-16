import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivitiesList from "./ActivitiesList";
import ActivityDetail from "../details/ActivityDetail";
import  ActivityForm  from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/activityStore";

const ActivitiesDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList />
      </GridColumn>

      <GridColumn width={6}>
        {selectedActivity && !editMode && <ActivityDetail />}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
