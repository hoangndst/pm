import { checkConversationExistByUsername } from "../controllers/conversation.controller.js";

let users = [];
const addUser = async ({ id, userInfo, conversationId }) => {
  if (!userInfo || !conversationId) return { error: "userInfo and conversationId are required." };
  const check = await checkConversationExistByUsername(userInfo.username, conversationId);
  if (check) {
    const user = { id, userInfo, conversationId };
    users.push(user);
    return { user };
  } else {
    return { error: "You don't have permission to join this conversation." };
  }
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};

const SocketService = {
  addUser,
  removeUser
};
export default SocketService