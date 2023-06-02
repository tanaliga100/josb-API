const user = {
  name: "kimmy100",
  email: "kimmy100@mail.com",
  password: "secret",
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
    if (data) {
      APIResponse(data);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector(".register").addEventListener("click", function () {
  registerHandler();
  console.log("register handler fired");
});
const loginHandler = async () => {
  const currentToken = localStorage.getItem("token");
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (data) {
      APIResponse(data);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector(".login").addEventListener("click", function () {
  loginHandler();
  console.log("login handler fired");
});

document.querySelector(".logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  console.log("logout handler fired");
});

// API RESPONSE
const APIResponse = (data) => {
  console.log(data);
  localStorage.setItem("token", data.token);
  const messageBox = document.createElement("div"); // Create a new div element for the pop-up message

  const displayMessage = () => {
    messageBox.style.display = "none"; // Hide the pop-up message
    clearTimeout(timeoutID); // Clear the setTimeout
  };

  messageBox.innerHTML = data.msg.msg || data.msg;
  messageBox.style.position = "fixed";
  messageBox.style.top = "50%";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translate(-50%, -50%)";
  messageBox.style.background = "#fff";
  messageBox.style.padding = "10px";
  messageBox.style.border = "1px solid #000";
  messageBox.style.zIndex = "9999";

  document.body.appendChild(messageBox); // Add the pop-up message to the document body

  const timeoutID = setTimeout(displayMessage, 2000); // Set the setTimeout
};
