import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../App/stores/activityStore";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreateActivity } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to='/' >
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "7px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities' />
        <Menu.Item as={NavLink} to='/createactivity'>
          <Button
            onClick={() => {
              openCreateActivity();
            }}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
