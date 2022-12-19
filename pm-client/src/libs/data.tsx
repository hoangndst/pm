import { Task } from "./type";

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
  for (let i = 1; i <= 10; i++) {
    data.push({
      id: `${i}`,
      name: `Team ${i}`,
      about: `Team ${i} description`,
      teamMember: [
        {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
          username: "hoangndst",
        },
        {
          id: "2",
          firstName: "Mac Quynh",
          lastName: "Hoa",
          username: "hoamq",
        },
        {
          id: "3",
          firstName: "Luong Trung",
          lastName: "Kien",
          username: "kienlt",
        },
        {
          id: "4",
          firstName: "Ho Manh",
          lastName: "Tien",
          username: "tienhm",
        },
        {
          id: "5",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
          username: "hoangndst",
        },
      ],
      projects: [
        {
          id: "1",
          owner: {
            id: "1",
            username: "hoangndst",
          },
          name:  `Project 1`,
        },
        {
          id: "2",
          owner: {
            id: "2",
            username: "hoanmq",
          },
          name:  `Project 2`,
        },
      ],
      createdOn: "2021-10-10",
    })
  }
  return data;
}


export function getMessages() {
  let data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      conversationId: i,
      conversationName: `Conversation ${i}`,
      lastMessage: {
        userId: "1",
        userName: "Nguyen Dinh Hoang",
        message: "This is a very long message that will be truncated by the UI component to fit in the UI component", 
        time: "2021-10-10",
      }
    })
  }
  return data;
}

export function getMessages2() {
  let data = {
    conversationId: 1,
    conversationName: `Conversation 1`,
    messages: [
      {
        id: 1,
        messageContent: "This is a very long message that will be truncated by the UI component to fit in the UI component",
        sentDate: "2021-10-10",
        fromUser: {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        }
      },
      {
        id: 2,
        messageContent: "This is a very long message that will be truncated by the UI component to fit in the UI component",
        sentDate: "2021-10-10",
        fromUser: {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        }
      },
      {
        id: 3,
        messageContent: "This is a very long message that will be truncated by the UI component to fit in the UI component",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
      {
        id: 4,
        messageContent: "Đi chơi không?",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
      {
        id: 5,
        messageContent: "Ok 👌👌👌👌👌👌👌",
        sentDate: "2021-10-10",
        fromUser: {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        }
      },
      {
        id: 6,
        messageContent: "Khoảng 5h nhé 🥱🥱🥱?",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
      {
        id: 7,
        messageContent: "Muộn tí còn tắm 😎😎😎",
        sentDate: "2021-10-10",
        fromUser: {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        }
      },
      {
        id: 8,
        messageContent: "oke =)))",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
      {
        id: 6,
        messageContent: "Khoảng 5h nhé 🥱🥱🥱?",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
      {
        id: 7,
        messageContent: "Muộn tí còn tắm 😎😎😎",
        sentDate: "2021-10-10",
        fromUser: {
          id: "1",
          firstName: "Nguyen Dinh",
          lastName: "Hoang",
        }
      },
      {
        id: 8,
        messageContent: "oke =)))",
        sentDate: "2021-10-10",
        fromUser: {
          id: "2",
          firstName: "Nguyen Dinh",
          lastName: "Minh",
        }
      },
    ]
  }
  return data;
}
