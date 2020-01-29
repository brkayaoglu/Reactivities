import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/rootStore";
import { ProfileEditForm } from "./ProfileEditForm";
import { observer } from "mobx-react-lite";

const ProfileDescription = () => {
  const [editMode, setEditMode] = useState(false);
  const rootStore = useContext(RootStoreContext);
 
  const { profile, isCurrentUser, updateProfile } = rootStore.profileStore;
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile!.username}`}
          />
          {isCurrentUser &&  (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>{editMode ? <ProfileEditForm updateProfile={updateProfile} profile={profile!} /> : <span>{profile?.bio}</span>}</Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);