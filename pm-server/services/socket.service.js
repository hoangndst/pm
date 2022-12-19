import { getUsersByConversationId, checkConversationExistByUserId } from "../controllers/conversation.controller.js";

let users = [];

const initUser = async ({ userId, id }, callback) => {
  if (!userId) return { error: "userId is required." };
  if (users.find((user) => user.id === id)) return { error: "User existed" }
  const user = { id: id, userId: userId };
  users.push(user)
  return { user };
}

// {
//   id: 'LWePlD2YRwPqsoCpAAAP', socket
//   userId: '1lvc0egklbm8jq39',
//   userInfo: {
//     id: '1lvc0egklbm8jq39',
//     username: 'quangnd',
//     first_name: 'Nguyễn',
//     last_name: 'Quang'
//   },
//   conversationId: 'asdadsasasdas'
// }

const addUser = async ({ id, userInfo, conversationId }) => {
  if (!userInfo || !conversationId) return { error: "userInfo and conversationId are required." };
  const check = await checkConversationExistByUserId(userInfo.id, conversationId);
  if (check) {
    const addInfoToUserInUsers = users.find((user) => user.id === id);
    if (addInfoToUserInUsers) {
      addInfoToUserInUsers.userInfo = userInfo;
      addInfoToUserInUsers.conversationId = conversationId
      return { user: addInfoToUserInUsers };
    } else {
      const user = { id: id, userId: userInfo.id, userInfo: userInfo, conversationId: conversationId };
      users.push(user)
      return { user };
    }
  } else {
    return { error: "You don't have permission to join this conversation." };
  }
};

const removeUser = (id) => {
  const userRemove = users.find((user) => user.id === id);
  users = users.filter((user) => user.id !== id)
  return userRemove;
};

const addUsersSendNotificationMessage = async ({ conversationId }) => {
  const usersInConversation = await getUsersByConversationId(conversationId)
  const usersId = usersInConversation.map((user) => user.id)
  console.log("LIST USER CAN ACCESS CONVERSATION 👌👌 : ", usersId)
  let userToSendMessage = []
  users.map((user) => {
    if (usersId.includes(user.userId)) {
      if (user.conversationId) {
        console.log(user.userId, user)
        console.log(!user.userId, user.conversationId === conversationId)
        if (user.conversationId === conversationId) {
          return
        } else {
          console.log(`🆕 Add ${user.userId} to sent Notification`)
          userToSendMessage.push(user)
        }
      } else {
        console.log(`🆕 Add ${user.userId} to sent Notification`)
        userToSendMessage.push(user)
      }
    }
  })
  return userToSendMessage
}

const getUserToSendNotification = async ({ userId }) => {
  return users.find((user) => user.userId === userId)
}

const getUsersToSendNotification = async ({ userIds }) => {
  return users.filter((user) => userIds.includes(user.userId))
}

const SocketService = {
  addUser,
  removeUser,
  initUser,
  addUsersSendNotificationMessage,
  getUserToSendNotification,
  getUsersToSendNotification
};
export default SocketService