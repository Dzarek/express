const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  // new Quiz({ title: "Pytanie 1", vote: 0 }).save();
  //film 102 3:00
  const show = !req.session.vote;
  Quiz.find({}, (err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote;
    });
    res.render("quiz", { title: "Quiz", data, show, sum });
  });
});
router.post("/", (req, res) => {
  const body = req.body.quiz;
  Quiz.findOne({ _id: body }, (err, data) => {
    data.vote = data.vote + 1;
    data.save(() => {
      req.session.vote = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;
