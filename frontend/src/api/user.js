exports.signup = async (auth_data) => {
  const response = await fetch(`http://localhost:5000/api/user/signup`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(auth_data),
  });

  const data = await response.json();
  if (response.status === 200) {
    return data.authtoken; // authtoken
  }

  return data.error;
};

exports.login = async (auth_data) => {
  const response = await fetch(`http://localhost:5000/api/user/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(auth_data),
  });

  const data = await response.json();
  if (response.status === 200) {
    return data.authtoken; // authtoken
  }

  return data.error;
};

exports.getusers = async () => {
  const response = await fetch(`http://localhost:5000/api/user/getusers`, {
    method: "get",
    headers: {
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWI2ZmRlZGI4NTljNmNmOTExMzgwIn0sImlhdCI6MTY2NDc5NzUyOH0.dDeTFZAIwuWgHx9kVrUC2qZ7SouVyILLIAmLNILuG1M",
    },
  });

  const data = await response.json();
  if (response.status === 200) {
    return data; // array of users
  }

  return data.error;
};

exports.getuser = async (uid) => {
  const response = await fetch(
    `http://localhost:5000/api/user/getuser/${uid}`,
    {
      method: "get",
      headers: {
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWI2ZmRlZGI4NTljNmNmOTExMzgwIn0sImlhdCI6MTY2NDc5NzUyOH0.dDeTFZAIwuWgHx9kVrUC2qZ7SouVyILLIAmLNILuG1M",
      },
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data; // user
  }

  return data.error;
};

exports.updateuser = async (user_data) => {
  const response = await fetch(
    `http://localhost:5000/api/user/updateuser/633ab6fdedb859c6cf911380`,
    {
      method: "put",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWI2ZmRlZGI4NTljNmNmOTExMzgwIn0sImlhdCI6MTY2NDc5NzUyOH0.dDeTFZAIwuWgHx9kVrUC2qZ7SouVyILLIAmLNILuG1M",
      },
      body: JSON.stringify(user_data),
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data; // user
  }

  return data.error;
};

exports.deleteuser = async (auth_data) => {
  const response = await fetch(
    `http://localhost:5000/api/user//deleteuser/633ab6fdedb859c6cf911380`,
    {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWI2ZmRlZGI4NTljNmNmOTExMzgwIn0sImlhdCI6MTY2NDc5NzUyOH0.dDeTFZAIwuWgHx9kVrUC2qZ7SouVyILLIAmLNILuG1M",
      },
      body: JSON.stringify(auth_data),
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data; // user
  }

  return data.error;
};
