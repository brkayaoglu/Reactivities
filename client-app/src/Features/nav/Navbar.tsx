import React, { useContext, useState } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../App/stores/rootStore";
import { observer } from "mobx-react-lite";

const Navbar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openCreateActivity } = rootStore.activityStore;
  const { user, logout } = rootStore.userStore;
  
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "7px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item as={NavLink} to="/createactivity">
          <Button
            onClick={() => {
              openCreateActivity();
            }}
            positive
            content="Create Activity"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
