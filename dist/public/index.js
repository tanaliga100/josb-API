const user = {
  name: "jordan",
  email: "jordan@mail.com",
  password: "password",
};
const fetchEndpoints = async () => {
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
document.querySelector("button").addEventListener("click", function () {
  fetchEndpoints();
  console.log("fired");
});

const APIResponse = (data) => {
  console.log({ data });
  localStorage.setItem("token", data.token);
};
