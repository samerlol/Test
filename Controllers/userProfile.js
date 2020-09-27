const db = require("../models");
const UserProfile = db.userProfile;

// Find a single user profile with an id.
exports.findOneByID = async (req, res) => {
  const id = req.query.id;
  await UserProfile.findOne({
    where: { user: id },
    attributes: ["user", "display_name", "email"],
  })
    .then((data) => {
      data
        ? res.send(data)
        : res.status(504).send({ message: "User does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User By id = ${id}`,
      });
    });
};
