exports.getquestions = async () => {
  const response = await fetch("http://localhost:5000/api/question/questions", {
    method: "get",
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  return data.error;
};

exports.getquestion = async (quid) => {
  const response = await fetch(
    `http://localhost:5000/api/question/question/${quid}`,
    {
      method: "get",
    }
  );

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  return data.error;
};

exports.ask = async (question_body) => {
  const response = await fetch(`http://localhost:5000/api/question/ask`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWRhZTY3ZTNiNzcyMDQwNWUzNWNhIn0sImlhdCI6MTY2NDgwMTU2MH0.ZOK2FBCVYXfKHMpg7Nz1vxxOzN4_mBDRc_sIknEk7xc",
    },
    body: JSON.stringify(question_body),
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  return data.error;
};

exports.vote = async (quid) => {
  const response = await fetch(
    `http://localhost:5000/api/question/vote/${quid}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWRhZTY3ZTNiNzcyMDQwNWUzNWNhIn0sImlhdCI6MTY2NDgwMTU2MH0.ZOK2FBCVYXfKHMpg7Nz1vxxOzN4_mBDRc_sIknEk7xc",
      },
    }
  );

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  return data.error;
};

exports.answer = async (answer_data) => {
  const response = await fetch(
    `http://localhost:5000/api/question/answer/${answer_data.quid}`,
    {
      method: "put",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWRhZTY3ZTNiNzcyMDQwNWUzNWNhIn0sImlhdCI6MTY2NDgxMTYyNn0.t7o_DDS9Xm6euZSgLbV_jaPUFHXZVCbws9UacKbNt7o",
      },
      body: JSON.stringify(answer_data.answer),
    }
  );

  const data = await response.json();
  console.log(data);
};

exports.delete_answer = async (answer) => {
  const response = await fetch(
    `http://localhost:5000/api/question//delete/${answer.quid}/${answer.auid}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWRhZTY3ZTNiNzcyMDQwNWUzNWNhIn0sImlhdCI6MTY2NDgwMTU2MH0.ZOK2FBCVYXfKHMpg7Nz1vxxOzN4_mBDRc_sIknEk7xc",
      },
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data;
  }

  return data.error;
};

exports.delete_question = async (quid) => {
  const response = await fetch(
    `http://localhost:5000/api/question/delete/${quid}`,
    {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWRhZTY3ZTNiNzcyMDQwNWUzNWNhIn0sImlhdCI6MTY2NDgwMTU2MH0.ZOK2FBCVYXfKHMpg7Nz1vxxOzN4_mBDRc_sIknEk7xc",
      },
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data;
  }

  return data.error;
};
