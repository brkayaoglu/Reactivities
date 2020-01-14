import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateActivity: () => void;
}

export const Navbar : React.FC<IProps> = ({openCreateActivity}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="./assets/logo.png" alt="logo" style={{marginRight:"7px"}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={()=>{
            openCreateActivity();
          }} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
