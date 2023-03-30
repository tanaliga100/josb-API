const user = {
  name: "dan",
  email: "dan@mail.com",
  password: "secret123",
};
const registerHandler = async () => {
  try {
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    APIResponse(data);
  } catch (error) {
    console.log({ error });
  }
};

document.querySelector(".register").addEventListener("click", function () {
  registerHandler();
  console.log("register handler fired");
});
const loginHandler = async () => {
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    APIResponse(data);
  } catch (error) {
    console.log({ error });
  }
};

document.querySelector(".login").addEventListener("click", function () {
  loginHandler();
  console.log("login handler fired");
});

// TOKEN PERSIST
const APIResponse = (data) => {
  console.log({ data });
  localStorage.setItem("token", data.token);
};
