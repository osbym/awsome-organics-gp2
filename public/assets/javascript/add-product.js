//async function to create a new product
async function createProduct(event) {
  // this function is not used in this project but it is used in the login.js file
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const product = {};
  for (const [key, value] of formData.entries()) {
    // this for loop is used to create a new product object from the form data
    product[key] = value;
  }
  const response = await fetch("/api/products", {
    // this function will be used to create a new product in the database
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const product = await response.json();
    alert(`${product.name} was successfully created!`);
    window.location.href = "/";
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
//async function to update a product
async function updateProduct(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const product = {};
  for (const [key, value] of formData.entries()) {
    product[key] = value;
  }
  const response = await fetch(`/api/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const product = await response.json();
    alert(`${product.name} was successfully updated!`);
    window.location.href = "/";
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
//async function to delete a product
async function deleteProduct(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const product = {};
  for (const [key, value] of formData.entries()) {
    product[key] = value;
  }
  const response = await fetch(`/api/products/${product.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const product = await response.json();
    alert(`${product.name} was successfully deleted!`);
    window.location.href = "/";
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
//async function to get all products
async function getProducts() {
  const response = await fetch("/api/products");
  if (response.ok) {
    const products = await response.json();
    return products;
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
//async function to get a product
async function getProduct(id) {
  const response = await fetch(`/api/products/${id}`);
  if (response.ok) {
    const product = await response.json();
    return product;
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
//async function to get a product by name
async function getProductByName(name) {
  const response = await fetch(`/api/products/${name}`);
  if (response.ok) {
    const product = await response.json();
    return product;
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
