//get references to our form and button and input using jquery
//const signupForm = $("#signup-form");
//const loginForm = $("#login-form");

//async function to handle signup
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    //check if the response status
    if (response.ok) {
      console.log("success");
      alert("New user created you can now log in");
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

//async function to handle login
async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
