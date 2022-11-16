import database from "../models/index.js"

// get user info
export const getUser = async (req, res) => {
  try {
    const user = await database.user.findOne({
      where: { id: req.params.id },
    })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}