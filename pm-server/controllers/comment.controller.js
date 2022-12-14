import database from "../models/index.js";
import uniqid from "uniqid";
import { Op } from "sequelize";

export const createComment = async (req, res) => {
  const user_id = req.body.userId;
  const comment_id = uniqid();
  const task_id = req.body.taskId;
  const content = req.body.content;

  const comment = {
    id: comment_id,
    user_id,
    task_id,
    comment_content: content,
  };

  try {
    await database.comment.create(comment);
    res.status(200).send({ message: "Add Comment Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const user_id = req.body.userId;
  const task_id = req.body.taskId;
  const comment_id = req.body.commentId;
  try {
    await database.comment.destroy({
      where: {
        user_id,
        task_id,
      },
    });
    res.status(200).send({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createReaction = async (req, res) => {
  const user_id = res.body.userId;
  const comment_id = res.body.commentId;
  const comment_reaction = {
    user_id,
    comment_id: comment_id,
  };
  try {
    await database.commentReaction.create(comment_reaction);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const removeReaction = async (req, res) => {
  const user_id = res.body.userId;
  const comment_id = res.body.commentId;
  try {
    await database.commentReaction.destroy({
      where: {
        user_id,
        comment_id,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getCommentByUserId = async (req, res) => {
  const userId = req.query.id;
  try {
    const comments = await database.comment.findAll({
      where: {
        user_id: userId,
      },
      attributes: ["id", "comment_content"],
    });

    const user = await database.user.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "username", "first_name", "last_name"],
    });

    const commentsWithUser = comments.map((comment) => {
      return {
        ...comment.dataValues,
        user,
      };
    });

    res.status(200).send(commentsWithUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getCommentByTaskId = async (req, res) => {
  const taskId = req.query.id;
  try {
    const comments = await database.comment.findAll({
      where: {
        task_id: taskId,
      },
      attributes: ["id", "comment_content", "user_id"],
    });

    const users = await database.user.findAll({
      where: {
        id: {
          [Op.in]: comments.map((comment) => comment.user_id),
        },
      },
      attributes: ["id", "username", "first_name", "last_name"],
    });

    const commentsWithTask = comments.map((comment) => {
      const user = users.find((user) => user.id === comment.user_id);
      return {
        ...comment.dataValues,
        user,
      };
    });
    res.status(200).send(commentsWithTask);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllCommentReactions = async (req,res) =>{
  const commentId=req.query.commentId;
  try {
    const commentReactionsData = await database.commentReaction.findAll({
      where: {
        comment_id: commentId
      },
      attributes: [
        "id",
        "reaction",
        "user_id"
      ],
    });
    const users = await database.user.findAll({
      where: {
        id: {
          [Op.in]: commentReactions.map((commentReaction) => commentReaction.user_id),
        },
      },
      attributes: ["id", "username", "first_name", "last_name"],
    });
    const commentReactions = commentReactionsData.map((commentReaction) => {
      const user = users.find((user) => user.id === commentReaction.user_id);
      return {
        ...commentReaction,
        user,
      };
    });
    res.status(200).json(commentReactions);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }

};