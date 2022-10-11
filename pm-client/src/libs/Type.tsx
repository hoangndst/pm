
export type User = {
  id: string;
  username?: string;
  email?: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export type Team = {
  id: string;
  name: string;
  about: string;
  teamMember?: User[];
}

export type Project = {
  id: string;
  status: string;
  owner: User;
  name: string;
  team: Team;
}

export type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
  project: Project;
  dueDate: string;
  createdBy: User;
  assignedTo: User;
  createdOn: string;
  lastModifiedOn: string;
  completedOn?: string;
  description?: string;
  subTasks?: Task[];
}
