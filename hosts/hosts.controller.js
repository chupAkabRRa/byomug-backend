const express = require("express");
const router = express.Router();
const hostService = require("./host.service");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/:id", getById);
router.get("/", getAll);

module.exports = router;

function authenticate(req, res, next) {
  hostService
    .authenticate(req.body)
    .then(host =>
      host
        ? res.json(host)
        : res.status(400).json({ message: "Name or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  hostService
    .create(req.body)
    .then(host => (host ? res.json(host) : res.json({})))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  hostService
    .getAll()
    .then(hosts => res.json(hosts))
    .catch(err => next(err));
}

function getById(req, res, next) {
  hostService
    .getById(req.params.id)
    .then(host => (host ? res.json(host) : res.sendStatus(404)))
    .catch(err => next(err));
}
