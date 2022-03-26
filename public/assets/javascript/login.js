// function signupFormHandler(event) {
//   event.preventDefault();
//   const username = document.querySelector("#username-signup").value.trim();
//   const email = document.querySelector("#email-signup").value.trim();
//   const password = document.querySelector("#password-signup").value.trim();

//   if (username && email && password) {
//     //if signup is successful alert user
//     if (true) {
//       window.alert("Signup successful");
//     }
//     fetch("/api/users", {
//       method: "post",
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     }).then((response) => {
//       //will redirect to login page
//       //console.log(response); //this will console log the response
//     });
//   }
// }

// async function loginFormHandler(event) {
//   event.preventDefault();

//   const email = document.querySelector("#email-login").value.trim();
//   const password = document.querySelector("#password-login").value.trim();

//   if (email && password) {
//     const response = await fetch("/api/users/login", {
//       method: "post",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector(".signup-form")
//   .addEventListener("submit", signupFormHandler);

// document
//   .querySelector(".login-form")
//   .addEventListener("submit", loginFormHandler);

// here I need to capture the form data from the signup form and send it to the server
const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const pwd = document.querySelector("#password").value.trim();

  if (firstName && lastName && email && pwd) {
    fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        pwd,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //will redirect to login page
      console.log(response); //this will console log the response
      //if signup is successful alert user
      if (response.ok) {
        window.alert("Signup successful");
      } else {
        alert(response.statusText);
      }
    });
  }
});

//----------------------------------------------------------------------------------------------------------------------//
//Now I need to do the same but for the login form
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email: email,
        pwd: password,
      }),

      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // console.log(email, password);
      //will redirect to login page
      // console.log(response); //this will console log the response
      //if signup is successful alert user
      if (response.ok) {
        window.alert("Login successful");
      } else {
        alert(response.statusText);
      }
    });
  }
});
