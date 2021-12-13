//async function to handle logout
async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/"); //redirect to home page
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout); //is #logout an id or a class? // it is an id
