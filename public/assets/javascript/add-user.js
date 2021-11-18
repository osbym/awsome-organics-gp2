//async function to handle new users
async function addUserFormHandler(event) {
  event.preventDefault();
  const form = event.target; // this is the form element that was submitted (the form element that was clicked)
  const formData = new FormData(form); // will create a FormData object that contains all the data from the form
  const data = {}; // this is the object that will be sent to the server to create a new user object
  formData.forEach((value, key) => (data[key] = value)); // this forEach loop is used to create a new user object from the form data
  const response = await fetch("/users", {
    // this is the fetch request to the server to create a new user object in the database
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // if the response is ok, then the user was created successfully
    const user = await response.json();
    loginUser(user); // this function is defined in the login.js file and is used to log the user in
  } else {
    alert(response.statusText); // if the response is not ok, then an error message will be displayed
  }
}

// Add event listener to form
document
  .querySelector(".signup-form") // this is the form element that was clicked to submit the form
  .addEventListener("submit", addUserFormHandler); // this is the event listener that will be triggered when the form is submitted
