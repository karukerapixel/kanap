/** Retrieve and display the product data */
const apiRequest = async () => {
  const params = new URLSearchParams(window.location.search);
  const url = `http://localhost:3000/api/products/${params.get("id")}`;

  try {
    const response = await fetch(url);
    const product = await response.json();

    renderProductDetails(product);
    addToCartButton(product);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    alert("Impossible de charger les données du produit. Veuillez réessayer.");
  }
};

apiRequest();

/** Render product details on the page */
const renderProductDetails = (product) => {
  document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent = product.name;
  document.querySelector("#price").textContent = product.price;
  document.querySelector("#description").textContent = product.description;

  const colorsDropdown = document.querySelector("#colors");
  product.colors.forEach((color) => {
    colorsDropdown.innerHTML += `<option value="${color}">${color}</option>`;
  });
};

/** Setup the "Add to Cart" button functionality */
const addToCartButton = (product) => {
  document.querySelector("#addToCart").addEventListener("click", () => {
    const selectedColor = document.querySelector("#colors").value;
    const selectedQuantity = parseInt(document.querySelector("#quantity").value, 10);

    if (!selectedColor || selectedQuantity <= 0) {
      alert("Veuillez sélectionner une couleur et une quantité valide.");
      return;
    }

    const cartItem = {
      id: product._id,
      color: selectedColor,
      quantity: selectedQuantity,
    };

    updateCart(cartItem);
  });
};

/** Update the cart in localStorage */
const updateCart = (newItem) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(
    (item) => item.id === newItem.id && item.color === newItem.color
  );

  if (existingItem) {
    existingItem.quantity += newItem.quantity;
    alert("La quantité a été mise à jour dans le panier.");
  } else {
    cart.push(newItem);
    alert("Le produit a été ajouté au panier.");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};
