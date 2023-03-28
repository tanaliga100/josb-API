const fetchEndpoints = async () => {
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

window.onload = () => {
  fetchEndpoints();
};

console.log("Client listening");

const user = {
  name: "lara",
  email: "lara@gmail.com",
  password: "password",
};

const APIResponse = (data) => {
  console.log({ data });
  localStorage.setItem("token", data.token);
};
