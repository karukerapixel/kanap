const API_URL = "http://localhost:3000/api/products/";

/** Retrieve and display stored products */
const getStoredProducts = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const product of cart) {
    try {
      const response = await fetch(`${API_URL}${product.id}`);
      const data = await response.json();

      createProductCards(data, product);
      updateTotalQuantity(product);
      updateTotalPrice(data, product);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
};
getStoredProducts();

/** Create product cards */
const createProductCards = (data, product) => {
  const cartProducts = document.getElementById("cart__items");

  const productCard = document.createElement("article");
  productCard.classList.add("cart__item");
  productCard.dataset.id = product.id;
  productCard.dataset.color = product.color;
  cartProducts.appendChild(productCard);

  productCard.innerHTML = `
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${product.color}</p>
        <p>${data.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  `;

  const input = productCard.querySelector(".itemQuantity");
  const deleteButton = productCard.querySelector(".deleteItem");

  input.addEventListener("change", (e) => changeProductQty(e, product));
  deleteButton.addEventListener("click", () => removeFromCart(product));
};

/** Update total quantity */
let totalQty = 0;
const updateTotalQuantity = (product) => {
  totalQty += parseInt(product.quantity, 10);
  document.getElementById("totalQuantity").textContent = totalQty;
};

/** Update total price */
let totalPrice = 0;
const updateTotalPrice = (data, product) => {
  totalPrice += parseInt(product.quantity, 10) * parseFloat(data.price);
  document.getElementById("totalPrice").textContent = totalPrice;
};

/** Change product quantity */
const changeProductQty = (e, product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.map((item) => {
    if (item.id === product.id && item.color === product.color) {
      item.quantity = parseInt(e.target.value, 10);
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.location.reload();
};

/** Remove product from cart */
const removeFromCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter(
    (item) => item.id !== product.id || item.color !== product.color
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.location.reload();
};

/** Cart validation */
const cartValidation = () => {
  const formSubmit = document.querySelector('form input[type="submit"]');

  formSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Veuillez ajouter un produit au panier avant de passer commande.");
      return;
    }

    const form = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    const isValid = validateForm(form);
    if (isValid) {
      submitOrder(form, cart);
    }
  });
};
cartValidation();

/** Validate form inputs */
const validateForm = ({ firstName, lastName, address, city, email }) => {
  const regex = {
    names: /^[A-Z][A-Za-zéèïîàç\'-]+$/,
    address: /^[A-Za-z0-9éèïîàç \'-]+$/,
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-z]{2,}$/,
  };

  const errors = {
    firstName: !regex.names.test(firstName),
    lastName: !regex.names.test(lastName),
    address: !regex.address.test(address),
    city: !regex.names.test(city),
    email: !regex.email.test(email),
  };

  document.querySelector("#firstNameErrorMsg").textContent = errors.firstName ? "Veuillez ressaisir votre prénom." : "";
  document.querySelector("#lastNameErrorMsg").textContent = errors.lastName ? "Veuillez ressaisir votre nom." : "";
  document.querySelector("#addressErrorMsg").textContent = errors.address ? "Veuillez ressaisir votre adresse." : "";
  document.querySelector("#cityErrorMsg").textContent = errors.city ? "Veuillez ressaisir le nom de votre ville." : "";
  document.querySelector("#emailErrorMsg").textContent = errors.email ? "Veuillez ressaisir votre email." : "";

  return !Object.values(errors).includes(true);
};

/** Submit order */
const submitOrder = (form, cart) => {
  const order = {
    contact: form,
    products: cart.map((item) => item.id),
  };

  fetch(`${API_URL}order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.clear();
      window.location.href = `./confirmation.html?orderId=${data.orderId}`;
    })
    .catch((error) => console.error("Order submission error:", error));
};
