const config = require("config.json");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  create,
  getById,
  scan,
  getAllHosts,
  getSummaryById
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    return {
      ...userWithoutHash
    };
  }
}

async function getAllHosts() {
  return await User.find({ isHost: true }).select("-hash");
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();

  const { hash, ...userWithoutHash } = user.toObject();
  return {
    ...userWithoutHash
  };
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function getSummaryById(userId) {
  const user = await User.findById(userId);
  var numOfCups = 0;
  var wasteWeight = 0;

  if (!user) throw "User not found";
  if (user.isHost === true) throw "Wrong user specified";

  user.referals.map(referal => {
    numOfCups += referal.score;
  });
  wasteWeight = numOfCups * 18;

  return { cups: numOfCups, weight: wasteWeight };
}

async function scan(hostId, userId) {
  const host = await User.findById(hostId);
  const user = await User.findById(userId);
  var newScore = 0;

  if (!host) throw "Host not found";
  if (!user) throw "User not found";

  user.referals.map(referal => {
    if (referal.host._id.toString() === hostId) {
      referal.score += 1;
      newScore = referal.score;
    }
  });

  // referal wasn't found -> add new one
  if (newScore === 0) {
    newScore = 1;
    user.referals.push({ host: host, score: newScore });
  }

  await user.save();
  return { name: user.name, score: newScore };
}
