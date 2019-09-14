const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  create,
  getById,
  addScore,
  getAllHosts
};

async function authenticate({ name, password }) {
  const user = await User.findOne({ name });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function create(userParam) {
  // validate
  if (await User.findOne({ name: userParam.name })) {
    throw 'Name "' + userParam.name + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();

  const { hash, ...userWithoutHash } = user.toObject();
  const token = jwt.sign({ sub: user.id }, config.secret);
  return {
    ...userWithoutHash,
    token
  };
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function addScore(hostId, userId) {
  const host = await User.findById(hostId);
  const user = await User.findById(userId);
  var newScore = 0;

  if (!host) throw "Host not found";
  if (!user) throw "User not found";
  if (host.isHost === false) throw "Can be called only by host";

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
  return newScore;
}

async function getAllHosts() {
  return await User.find({ isHost: true }).select("-hash");
}
