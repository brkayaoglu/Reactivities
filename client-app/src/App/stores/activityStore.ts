import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activitiesRegistry = new Map(); // new activities array form

  @observable initialLoad = false;

  @observable selectedActivity: IActivity | null = null;


  @observable submitting = false;

  @observable targetButton = "";

  @computed get activitiesByDate() {
    return Array.from(this.activitiesRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action clearActivity = () => {
    this.selectedActivity = null;
  };

  @action loadActivities = async () => {
    this.initialLoad = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("load activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activitiesRegistry.set(activity.id, activity);
        });
        this.initialLoad = false;
      });
    } catch (error) {
      runInAction("load activities error", () => {
        this.initialLoad = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getLoadActivity(id);
    if (activity) this.selectedActivity = activity;
    else {
      this.initialLoad = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activities", () => {
          this.selectedActivity = activity;
          this.initialLoad = false;
        });
      } catch (error) {
        runInAction("getting activity error", () => {
          this.initialLoad = false;
        });
        console.log(error);
      }
    }
  };

  @action getLoadActivity = (id: string) => {
    return this.activitiesRegistry.get(id);
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activitiesRegistry.get(id);
  };

  @action openCreateActivity = () => {
    this.selectedActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("create activities", () => {
        this.activitiesRegistry.set(activity.id, activity);

        this.submitting = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      runInAction("create activities error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit activities", () => {
        this.activitiesRegistry.set(activity.id, activity);

        this.submitting = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      runInAction("edit activities error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action deleteActivity = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.targetButton = e.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activities", () => {
        this.activitiesRegistry.delete(id);
        this.targetButton = "";
        this.submitting = false;
        if (this.selectedActivity !== null) {
          if (this.selectedActivity.id === id) this.selectedActivity = null;
        }
      });
    } catch (error) {
      runInAction("delete activites error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());
