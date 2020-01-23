import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setActivityProps, createAttendee } from "../common/util/util";

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activitiesRegistry = new Map(); // new activities array form

  @observable initialLoad = false;

  @observable selectedActivity: IActivity | null = null;

  @observable submitting = false;

  @observable targetButton = "";

  @observable loading = false;

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activitiesRegistry.values())
    );
  }

  groupActivitiesByDate = (activities: IActivity[]) => {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  };

  @action clearActivity = () => {
    this.selectedActivity = null;
  };

  @action loadActivities = async () => {
    this.initialLoad = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("load activities", () => {
        activities.forEach(activity => {
          activity = setActivityProps(activity, this.rootStore.userStore.user!);
          this.activitiesRegistry.set(activity.id, activity);
        });
        this.initialLoad = false;
      });
      //console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      runInAction("load activities error", () => {
        this.initialLoad = false;
      });

      console.log(error);
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getLoadActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.initialLoad = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activities", () => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.selectedActivity = activity;
          this.activitiesRegistry.set(activity.id, activity);
          this.initialLoad = false;
        });
        return activity;
      } catch (error) {
        runInAction("getting activity error", () => {
          this.initialLoad = false;
        });
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
    const attendee = createAttendee(this.rootStore.userStore.user!);
    attendee.isHost = true;
    let attendees = [];
    attendees.push(attendee);
    activity.isHost = true;
    activity.attendees = attendees;
    try {
      await agent.Activities.create(activity);
      runInAction("create activities", () => {
        this.activitiesRegistry.set(activity.id, activity);

        this.submitting = false;
        this.selectedActivity = activity;
      });
      history.push(`/activities/${activity.id}`);
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
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("edit activities error", () => {
        this.submitting = false;
      });
      toast.error(error.response.data.errors.Description[0]);
      console.log(error.response);
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

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.attendees.push(attendee);
          this.selectedActivity.isGoing = true;
          this.activitiesRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem signing activity!");
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.unattend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.attendees = this.selectedActivity.attendees.filter(
            a => a.userName !== this.rootStore.userStore.user!.username
          );
          this.selectedActivity.isGoing = false;
          this.activitiesRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(()=> {
        this.loading = false;
      })
      toast.error("Problem signing out activity!")
    }
  };
}
