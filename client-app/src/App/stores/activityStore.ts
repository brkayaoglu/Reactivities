import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activitiesRegistry = new Map(); // new activities array form
  @observable activities: IActivity[] = [];
  @observable initialLoad = false;

  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;

  @observable submitting = false;

  @observable targetButton = "";

  @computed get activitiesByDate() {
    return Array.from(this.activitiesRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.initialLoad = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('load activities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activitiesRegistry.set(activity.id, activity);
        });
        this.initialLoad = false;
      });
    } catch (error) {
      runInAction('load activities error',() => {
        this.initialLoad = false;
      });
      console.log(error);
    }
  };

  @action selectActivity = (id: string) => {
    this.editMode = false;
    this.selectedActivity = this.activitiesRegistry.get(id);
  };

  @action openCreateActivity = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('create activities',()=>{
        this.activitiesRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
      this.selectedActivity = activity;
      })
      
    } catch (error) {
      runInAction('create activities error',()=>{
        this.submitting = false;
      })
      
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('edit activities',()=>{
        this.activitiesRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
      this.selectedActivity = activity;
      })
      
    } catch (error) {
      runInAction('edit activities error',()=>{
        this.submitting = false;
      })
      
      console.log(error);
    }
  };

  @action openEditMode = (activity: IActivity) => {
    this.selectedActivity = activity;
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelEditMode = () => {
    this.editMode = false;
  };

  @action deleteActivity = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.targetButton = e.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('delete activities',()=> {
        this.activitiesRegistry.delete(id);
        this.targetButton = "";
        this.submitting = false;
        if(this.selectedActivity !== undefined){
          if(this.selectedActivity.id === id )
            this.selectedActivity = undefined;
         }
      })
    } catch (error) {
      runInAction('delete activites error',()=>{
        this.submitting = false;
      })
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());
