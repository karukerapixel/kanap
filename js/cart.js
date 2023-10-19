const API_URL = "http://localhost:3000/api/products/";

/**
 * 1/ display stored products
 *
 * a. retrieve data from products stored in local storage
 * b. send a request by setting the API url to retrieve all stored product data
 * c. create product cards
 * d. display total quantity and total price
 */

/** 1/a */

const getStoredProducts = async () => {
  const theCustomerCart = await JSON.parse(localStorage.getItem("cart"));

  for (const product of theCustomerCart) {
    fetchRequest(product);
  }
};
getStoredProducts();

/** 1/b */

const fetchRequest = async (product) => {
  try {
    const response = await fetch(`${API_URL}${product.id}`);
    const data = await response.json();

    createProductCards(data, product);
    displayTotalQty(product);
    displayTotalPrice(data, product);
  } catch (error) {
    Error("Une erreur est survenue", error);
  }
};

/** 1/c */

const createProductCards = (data, product) => {
  const cartProducts = document.getElementById("cart__items");

  // product card container
  const productCard = document.createElement("article");
  productCard.classList.add("cart__item");
  productCard.dataset.id = product.id;
  productCard.dataset.color = product.color;
  cartProducts.appendChild(productCard);

  // product image
  const productImgContainer = document.createElement("div");
  productImgContainer.classList.add("cart__item__img");
  productCard.appendChild(productImgContainer);

  const productImg = document.createElement("img");
  productImg.src = data.imageUrl;
  productImg.alt = data.altTxt;
  productImgContainer.appendChild(productImg);

  // content container
  const productContentContainer = document.createElement("div");
  productContentContainer.classList.add("cart__item__content");
  productCard.appendChild(productContentContainer);

  // product description
  const productDescContainer = document.createElement("div");
  productDescContainer.classList.add("cart__item__content__description");
  productContentContainer.appendChild(productDescContainer);

  const productName = document.createElement("h2");
  productName.textContent = data.name;
  productContentContainer.appendChild(productName);

  const productColor = document.createElement("p");
  productColor.textContent = product.color;
  productContentContainer.appendChild(productColor);

  const productPrice = document.createElement("p");
  productPrice.textContent = data.price + "€";
  productContentContainer.appendChild(productPrice);

  // product settings
  const productSettingsContainer = document.createElement("div");
  productSettingsContainer.classList.add("cart__item__content__settings");
  productContentContainer.appendChild(productSettingsContainer);

  // display and change product quantity
  const productQtyContainer = document.createElement("div");
  productQtyContainer.classList.add("cart__item__content__settings__quantity");
  productSettingsContainer.appendChild(productQtyContainer);

  const productQty = document.createElement("p");
  productQty.textContent = "Qté :";
  productQtyContainer.appendChild(productQty);

  const productInput = document.createElement("input");
  productInput.classList.add("itemQuantity");
  productInput.type = "number";
  productInput.name = "itemQuantity";
  productInput.min = 1;
  productInput.max = 100;
  productInput.value = product.quantity;
  productQtyContainer.appendChild(productInput);

  changeProductQty(productInput, product);

  // deletion product settings
  const productDeleteContainer = document.createElement("div");
  productDeleteContainer.classList.add("cart__item__content__settings__delete");
  productSettingsContainer.appendChild(productDeleteContainer);

  const deleteButton = document.createElement("p");
  deleteButton.classList.add("deleteItem");
  deleteButton.textContent = "Supprimer";
  productDeleteContainer.appendChild(deleteButton);

  removeFromCart(deleteButton);
};

/** 1/d */

let totalQty = 0;
let totalPrice = 0;

const displayTotalQty = (product) => {
  const qtyElement = document.getElementById("totalQuantity");
  totalQty += JSON.parse(product.quantity);
  qtyElement.textContent = totalQty;
};

const displayTotalPrice = (data, product) => {
  const priceElement = document.getElementById("totalPrice");
  totalPrice += JSON.parse(product.quantity) * JSON.parse(data.price);
  priceElement.textContent = totalPrice;
};

/**
 * change the quantity of the product
 * save new data to local storage
 * refresh the page
 */

const changeProductQty = (input, data) => {
  let theCustomerCart = JSON.parse(localStorage.getItem("cart"));

  for (const product of theCustomerCart) {
    input.addEventListener("change", (e) => {
      if (product.color === data.color && product.id === data.id) {
        product.quantity = parseInt(e.target.value);
        localStorage.setItem("cart", JSON.stringify(theCustomerCart));
        window.location.reload();
      }
    });
  }
};

/**
 * remove the product from cart
 */

const removeFromCart = (button) => {
  button.addEventListener("click", (e) => {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    let theCustomerCart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < deleteButtons.length; i++) {
      let targetProduct = e.target.closest("article");
      targetProduct.remove();

      let targetProductId = targetProduct.dataset.id;
      let targetProductColor = targetProduct.dataset.color;
      let theCustomerCartUpdated = theCustomerCart.filter(
        (p) => p.id !== targetProductId || p.color !== targetProductColor
      );

      theCustomerCart = theCustomerCartUpdated;
      localStorage.setItem("cart", JSON.stringify(theCustomerCart));
      window.location.reload();
    }
  });
};

/**
 * 2/ cart validation
 *
 * a. check the validity of the entry
 * b. order form submission
 * c. send POST request to API
 */

/** 2/a */

const cartValidation = () => {
  const formSubmit = document.querySelector('form input[type="submit"]');

  // regex
  let REGEX_NAMES = /^[A-Z][A-Za-z\éèïîàç\'-]+[A-Za-z\éèïîàç]+$/;
  let REGEX_ADDRESS = /^[A-Z0-9 -'][A-Za-z\éèïîàç\0-9]+$/;
  let REGEX_EMAIL = /^[a-zA-Z0-9_.-]+\@+[a-zA-Z0-9]+\.+[a-z]{2,4}$/;

  formSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const theCustomerCart = JSON.parse(localStorage.getItem("cart"));

    // inputs value
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;
    const formInputs = firstName || lastName || address || city || email;

    // inputs error message
    const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    const addressErrorMsg = document.querySelector("#addressErrorMsg");
    const cityErrorMsg = document.querySelector("#cityErrorMsg");
    const emailErrorMsg = document.querySelector("#emailErrorMsg");

    if (theCustomerCart === undefined) {
      alert("Veuillez ajouter un produit au panier avant de passer commande");
    } else {
      if (formInputs === "") {
        alert("Veuillez remplir tous les champs du formulaire.");
      } else {
        let isValid = true;

        if (!REGEX_NAMES.test(firstName)) {
          firstNameErrorMsg.textContent = "Veuillez ressaisir votre prénom";
          isValid = false;
        } else {
          firstNameErrorMsg.textContent = "";
        }

        if (!REGEX_NAMES.test(lastName)) {
          lastNameErrorMsg.textContent =
            "Veuillez ressaisir votre nom de famille";
          isValid = false;
        } else {
          lastNameErrorMsg.textContent = "";
        }

        if (!REGEX_ADDRESS.test(address)) {
          addressErrorMsg.textContent = "Veuillez ressaisir votre adresse";
          isValid = false;
        } else {
          addressErrorMsg.textContent = "";
        }

        if (!REGEX_ADDRESS.test(city)) {
          cityErrorMsg.textContent = "Veuillez ressaisir le nom de votre ville";
          isValid = false;
        } else {
          cityErrorMsg.textContent = "";
        }

        if (!REGEX_EMAIL.test(email)) {
          emailErrorMsg.textContent = "Veuillez ressaisir votre email";
          isValid = false;
        } else {
          emailErrorMsg.textContent = "";
        }

        orderSubmit(isValid, firstName, lastName, address, city, email);
      }
    }
  });
};
cartValidation();

/** 2/b */

const orderSubmit = (isValid, firstName, lastName, address, city, email) => {
  if (isValid) {
    const theCustomerCart = JSON.parse(localStorage.getItem("cart"));
    const productsId = [];

    for (let products of theCustomerCart) {
      productsId.push(products.id);
    }

    let order = {
      contact: { firstName, lastName, address, city, email },
      products: productsId,
    };

    fetchPostRequest(order);
  }
};

/** 2/c */

const fetchPostRequest = async (order) => {
  try {
    const response = await fetch(API_URL + "/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    localStorage.clear();
    window.location.assign("./confirmation.html?orderId=" + data.orderId);
  } catch (error) {
    Error({ message: "une erreur est survenue", error });
  }
};
