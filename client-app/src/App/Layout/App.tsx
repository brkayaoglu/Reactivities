import React, { Fragment, useContext, useEffect } from "react"; //Fragments prevents siblings
import { Container } from "semantic-ui-react";
import { Navbar } from "../../Features/nav/Navbar";
import ActivitiesDashboard from "../../Features/activities/dashboard/ActivitiesDashboard";
import { observer } from "mobx-react-lite";
import { HomePage } from "../../Features/home/HomePage";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetail from "../../Features/activities/details/ActivityDetail";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./Loadingcomponent/LoadingComponent";
import ModalContainer from '../common/modals/ModalContainer'
import  ProfilePage  from "../../Features/profiles/ProfilePage";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const roortStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded } = roortStore.commonStore;

  const {getUser} = roortStore.userStore;

  useEffect(() => {
    if(token) {
      getUser().finally(()=> setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if(!appLoaded) return <LoadingComponent content='Loading app..' />

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/activities"
                  component={ActivitiesDashboard}
                />
                <Route path="/activities/:id" component={ActivityDetail} />
                <Route
                  key={location.key}
                  path={["/createactivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path='/profile/:username' component={ProfilePage}/>
                
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
