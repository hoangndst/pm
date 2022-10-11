import { Task } from "./Type";

export const tasks: Task[] = [
  {
    id: 1,
    taskName: "Task 1 this is a very long task name",
    taskDescription: "Task 1 description",
    project: {
      id: "1",
      status: "Active",
      owner: {
        id: "1",
        firstName: "John",
        lastName: "Doe",
      },
      name: "Project 1",
      team: {
        id: "1",
        name: "Team 1",
        about: "Team 1 description",
      },
    },
    dueDate: "2021-10-10",
    createdBy: {
      id: "1",
      firstName: "Nguyen Dinh",
      lastName: "Hoang",
    },
    assignedTo: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
    },
    createdOn: "2021-10-10",
    lastModifiedOn: "2021-10-10",
    completedOn: "2021-10-10",
    description: "Task 1 description",
  },
]


export function createData() {
  let data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      taskName: `Task ${i} this is a very long task name`,
      taskDescription: "Task 1 description",
      project: {
        id: "1",
        status: "Active",
        owner: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
        },
        name: "Project 1",
        team: {
          id: "1",
          name: "Team 1",
          about: "Team 1 description",
        },
      },
      dueDate: "2021-10-10",
      createdBy: {
        id: "1",
        firstName: "Nguyen Dinh",
        lastName: "Hoang",
      },
      assignedTo: {
        id: "1",
        firstName: "John",
        lastName: "Doe",
      },
      createdOn: "2021-10-10",
      lastModifiedOn: "2021-10-10",
      completedOn: i % 2 === 0 ? "2021-10-10" : undefined,
      description: "Task 1 description",
    })
  }
  return data;
}

export function createTeams() {
  let data = [];
  for (let i = 1; i <= 3; i++) {
    data.push({
      id: i,
      name: `Team ${i}`,
      about: `Team ${i} description`,
      teamMember: [
        {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        },
        {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        },
        {
          id: "3",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        },
        {
          id: "4",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        },
        {
          id: "5",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        },
      ]
    })
  }
  return data;
}