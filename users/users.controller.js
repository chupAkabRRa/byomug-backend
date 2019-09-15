const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.post("/scan", scan);
router.get("/hosts", getAllHosts);
router.get("/:id", getById);
router.get("/:id/summary", getSummaryById);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Name or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(user => (user ? res.json(user) : res.json({})))
    .catch(err => next(err));
}

function getAllHosts(req, res, next) {
  userService
    .getAllHosts()
    .then(hosts => (hosts ? res.json(hosts) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getSummaryById(req, res, next) {
  userService
    .getSummaryById(req.params.id)
    .then(summary => res.json(summary))
    .catch(err => next(err));
}

function scan(req, res, next) {
  userService
    .scan(req.body.hostId, req.body.userId)
    .then(score => res.json(score))
    .catch(err => next(err));
}
