import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../App/stores/activityStore";

export const Navbar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreateActivity } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "7px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
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
