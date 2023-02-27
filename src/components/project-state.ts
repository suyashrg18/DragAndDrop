import { State,Project,ProjectStatus } from "../utils/utils";

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
  
    private constructor() {
      super();
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
  
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addProject(title: string, description: string, noOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        noOfPeople,
        ProjectStatus.Active
      );
  
      this.projects.push(newProject);
      this.updateListeners();
    }
  
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }
  
    updateListeners() {
      for (const fn of this.listeners) {
        fn(this.projects.slice());
      }
    }
  }