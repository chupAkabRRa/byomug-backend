const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Host = db.Host;

module.exports = {
  authenticate,
  getAll,
  create,
  getById
};

async function authenticate({ name, password }) {
  const host = await Host.findOne({ name });
  if (host && bcrypt.compareSync(password, host.hash)) {
    const { hash, ...hostWithoutHash } = host.toObject();
    const token = jwt.sign({ sub: host.id }, config.secret);
    return {
      ...hostWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await Host.find().select("-hash");
}

async function create(hostParam) {
  // validate
  if (await Host.findOne({ name: hostParam.name })) {
    throw 'Name "' + hostParam.name + '" is already taken';
  }

  const host = new Host(hostParam);

  // hash password
  if (hostParam.password) {
    host.hash = bcrypt.hashSync(hostParam.password, 10);
  }

  // save user
  await host.save();

  const { hash, ...hostWithoutHash } = host.toObject();
  const token = jwt.sign({ sub: host.id }, config.secret);
  return {
    ...hostWithoutHash,
    token
  };
}

async function getById(id) {
  return await Host.findById(id).select("-hash");
}
