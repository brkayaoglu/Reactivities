import React, { useEffect, useContext, useState } from "react";
import { Grid, GridColumn, Loader } from "semantic-ui-react";
import ActivitiesList from "./ActivitiesList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/Loadingcomponent/LoadingComponent";
import { RootStoreContext } from "../../../App/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";

const ActivitiesDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    initialLoad,
    setPage,
    page,
    totalPages
  } = rootStore.activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (initialLoad && page === 0)
    return <LoadingComponent content="Loading activities.." />;
  return (
    <Grid>
      <GridColumn width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ActivitiesList />
        </InfiniteScroll>
      </GridColumn>

      <GridColumn width={6}><ActivityFilters/></GridColumn>
      <GridColumn width={10}>
        <Loader active={loadingNext} />{" "}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
