import { Component } from "./base-component";
import { Validatable,validate,AutoBind } from "../utils/utils";
import { ProjectState } from "./project-state";

const projectState = ProjectState.getInstance();

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", true, "user-input");
  
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      this.configure();
    }
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(): void {}
  
    gatherUserInputs(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDesc = this.descInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
  
      const titleObject: Validatable = {
        value: enteredTitle,
        required: true,
      };
  
      const descObject: Validatable = {
        value: enteredDesc,
        required: true,
        minLength: 5,
        maxLength: 100,
      };
  
      const peopleObject: Validatable = {
        value: +enteredPeople,
        required: true,
        minValue: 1,
        maxValue: 10,
      };
  
      if (!validate(titleObject)) {
        alert("Check the title entered");
      } else if (!validate(descObject)) {
        alert("Check the description entered Min: 5 chars, Max: 100 chars");
      } else if (!validate(peopleObject)) {
        alert("Check the no. of people entered Min: 1, Max: 10");
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
    }
  
    private clearInputs() {
      this.titleInputElement.value = "";
      this.descInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  
    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInputs();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }