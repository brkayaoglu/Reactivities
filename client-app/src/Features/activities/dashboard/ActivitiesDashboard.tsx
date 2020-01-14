import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { ActivitiesList } from "./ActivitiesList";
import { ActivityDetail } from "../details/ActivityDetail";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  cancelSelectedActivity: (activity: IActivity | null) => void;
  editActivity: (activity: IActivity) => void;
  createActivity: (activity: IActivity) => void;
  deleteActivity:(id:string) => void;
}

export const ActivitiesDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  cancelSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </GridColumn>

      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            setEditMode={setEditMode}
            cancelSelectedActivity={cancelSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0 }
            setEditMode={setEditMode}
            activity={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
};
