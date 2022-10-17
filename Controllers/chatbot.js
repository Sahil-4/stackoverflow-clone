const Query = require("../Models/chatbot_query");

const add_queries = async (data) => {npm
  // add a new query in db
  const query = await Query.create({
    keywords: data.keywords,
    answer: {
      message: data.answer?.message,
      author: false,
    },
  });

  return query;
};

exports.handleBot = async (req, res) => {
  // get all bot queries
  // find bot queries keywords in queries
  // if all keywords found return that query answer
  // if no query keyword matched
  // add that query in db
  // find query in questions
  // if found return that questions answer
  // if nothing matched
  // return no match reply
  try {
    // get all queries
    let all_queries = await Query.find({});

    // find match in query
    const query = req.body.query;
    for (let i = 0; i < all_queries.length; i++) {
      const { keywords } = all_queries[i];
      let f = -1;
      for (let j = 0; j < keywords.length; j++) {
        f = query.toLowerCase().search(keywords[j]);
        if (f === -1) break;
      }

      if (f !== -1 && all_queries[i].answer.message) {
        // return response if match found
        return res.json(all_queries[i].answer);
      }
    }

    // if no match found add the query in db
    add_queries({ keywords: query.split(" ") });

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
