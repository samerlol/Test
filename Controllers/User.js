const db = require("../models");
const User = db.user;
const UserProfile = db.userProfile;

const Op = db.Op;

// Create and Save a new User.
exports.create = async (req, res) => {
  let id = req.query.id;
  let type = req.query.type;
  let display_name = req.query.name;
  let email = req.query.email || null;

  if (!id || !type || !display_name)
    res.status(509).send({
      message: "Check entered values, ID,type or display_name cannot be empty.",
    });

  // Create a User
  const user = {
    id: req.query.id,
    type: req.query.type,
  };

  // Create a User Profile
  const userProfile = {
    user: id,
    display_name: req.query.name,
    email: email || null,
  };

  //find User before Create him.
  await User.findByPk(user.id)
    .then((data) => {
      data ? res.status(510).send({ message: "user Already Exists." }) : null;
    })
    .catch((err) => {
      res.status(507).send({
        message:
          err ||
          "could not create user, maybe user with same values already exists.",
      });
    });

  // Save user in database
  await User.create(user)
    .then((data) => {
      UserProfile.create(userProfile).then((data) => {
        res.send(data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating a user.",
      });
    });
};

// Retrieve all Users with specific type from the database.
exports.findAllByType = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Error occurred while retrieving the users.",
      });
    });
};

// Update list of users(More than one user).
exports.update = async (req, res) => {
  const type = req.query.type;
  const body = req.body;
  await body.map(async (Record) => {
    try {
      await User.update(Record, {
        where: { id: Record.id, type: type },
      }).then((num) => {
        num == 1
          ? res.send({
              message: "List of Users were updated successfully." + num,
            })
          : res.send({
              message: `Cannot update list of users with type=${type}. Maybe list was not found or req.body is empty!`,
            });
      });
    } catch (err) {
      console.log(`err ERR_HTTP_HEADERS_SENT`);
    }
  });
};

// Delete a user with no email with the specified id in the request.
exports.delete = (req, res) => {
  const id = req.query.id;

  UserProfile.findOne({ where: { user: id } }).then((data) => {
    data.get({ plain: true }).email !== null
      ? res
          .status(511)
          .send({ message: "You can not delete a user has an email" })
      : null;
    User.destroy({
      where: {
        id: id,
      },
      email: { [Op.ne]: null },
    })
      .then((num) => {
        num == 1
          ? res.send({
              message: "User was deleted successfully!",
            })
          : res.send({
              message: `Cannot delete User with id=${id}. Maybe the User was not found!`,
            });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id + "error " + err,
        });
      });
  });
};
