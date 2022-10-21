const Query = require("../Models/chatbot_query");
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SerpApiKey);

const add_queries = async (data) => {
  // add a new query in db
  const query = await Query.create({
    keywords: data.keywords,
    answer: data.answer,
  });

  return query;
};

const getQuery = async (query) => {
  try {
    let data = null;
    const result = new Promise((resolve, reject) => {
      search.json(
        {
          q: query,
        },
        (result) => resolve(result)
      );
    });

    await result.then(
      (res) => {
        data =
          res.knowledge_graph?.description ||
          (res.related_questions ?? [])[0]?.snippet;
      },
      (err) => {
        console.log(err);
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.handleBot = async (req, res) => {
  try {
    // handle bot queries
    let query = req.body.query;

    // find query in db
    const qr = await Query.find({ keywords: query.split(" ") });
    if (qr && qr[0]?.answer.message) {
      return res.json(qr[0].answer);
    }

    let message = await getQuery(query);
    if (message) {
      // add new query in db
      await add_queries({
        keywords: query.split(" "),
        answer: { message: message, author: false },
      });

      return res.json({ message: message, author: false });
    }

    // return apology
    return res.json({
      message:
        "Sorry i may not able to understand.\nYou can ask a new question by clicking on Ask Question button.",
      author: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "some error occured." });
  }
};
