const Question = require("../Models/Question");

exports.ask = async (req, res) => {
  try {
    if (req.headers.uid !== req.body.question_author?.id) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    const question = await Question.create(req.body);
    res.send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.questions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.send(questions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.question = async (req, res) => {
  try {
    const question = await Question.findById(req.params.quid);
    res.send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.vote = async (req, res) => {
  try {
    const question = await Question.findById(req.params.quid);
    if (!question) {
      return res.status(404).send({ error: "question not found" });
    }

    let n_question = question;
    let message = "upvoted";
    let idx = -1;
    n_question.question_total_votes.forEach((obj, i) => {
      if (obj._id.toString() === req.headers.uid) {
        message = "downvoted";
        idx = i;
        return;
      }
    });

    if (idx !== -1) {
      n_question.question_total_votes?.splice(idx, 1);
    } else {
      n_question.question_total_votes?.push(req.headers.uid);
    }

    await question.updateOne(n_question);
    return res.send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.answer = async (req, res) => {
  try {
    if (req.headers.uid !== req.body.answer_author?.uid) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    const question = await Question.findById(req.params.quid);
    let n_question = question;
    n_question.question_total_answers.push(req.body);

    await question.updateOne(n_question);
    return res.send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.quid);
    let n_question = question;

    let idx = -1;
    n_question.question_total_answers.forEach((answer, i) => {
      if (
        answer._id?.toString() === req.params.auid &&
        answer.answer_author.uid?.toString() === req.headers.uid
      ) {
        idx = i;
      }
    });

    if (idx === -1) {
      return res.status(404).send({ error: "answer not found" });
    }

    n_question.question_total_answers.splice(idx, 1);
    await question.updateOne(n_question);
    return res.send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const uid = req.headers.uid;
    const question = await Question.findById(req.params.quid);

    if (question?.question_author.id.toString() !== uid) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    question.deleteOne();
    return res.send({ nessage: "question deleted" });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: "un-authorised user" });
  }
};
