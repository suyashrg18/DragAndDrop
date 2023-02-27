export interface Validatable {
  value: string | number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  minValue?: number;
  maxValue?: number;
}

export enum ProjectStatus {
  Active,
  Finished,
}

//autobind decorator
export function AutoBind(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

export function validate(input: Validatable) {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength != null && typeof input.value === "string") {
    // "!= null" means it checks for both null and undefined
    isValid =
      isValid && input.value.toString().trim().length >= input.minLength;
  }
  if (input.maxLength != null && typeof input.value === "string") {
    isValid =
      isValid && input.value.toString().trim().length <= input.maxLength;
  }
  if (input.minValue != null && typeof input.value === "number") {
    isValid = isValid && input.value >= input.minValue;
  }
  if (input.maxValue != null && typeof input.value === "number") {
    isValid = isValid && input.value <= input.maxValue;
  }
  return isValid;
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

export type Listener<T> = (items: Project[]) => void;

export class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
