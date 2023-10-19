/**
 * send request to API :
 *
 * 1. retrieve product id in url params
 * 2. set API url with product Id
 */

const apiRequest = async () => {
  const params = new URLSearchParams(window.location.search);
  const url = "http://localhost:3000/api/products/";

  try {
    const response = await fetch(url + params.get("id"));
    const data = await response.json();

    createProductImg(data);
    addProductName(data);
    addProductPrice(data);
    addProductDesc(data);
    createColorOptions(data);
    addProductToCart(data);
  } catch (error) {
    Error({ message: "une erreur est survenue", error });
  }
};
apiRequest();

/**
 * create product img
 */

const createProductImg = (product) => {
  const imgContainer = document.querySelector(".item__img");

  const productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  imgContainer.appendChild(productImg);
};

/**
 * add product name
 */

const addProductName = (product) => {
  const productName = document.querySelector("#title");
  productName.textContent = product.name;
};

/**
 * add product price
 */

const addProductPrice = (product) => {
  const productPrice = document.querySelector("#price");
  productPrice.textContent = product.price;
};

/**
 * add product description
 */

const addProductDesc = (product) => {
  const productDesc = document.querySelector("#description");
  productDesc.textContent = product.description;
};

/**
 * retrieve product colors from the API
 * create color option
 */

const createColorOptions = (product) => {
  const colors = document.querySelector("#colors");

  for (let color of product.colors) {
    const productOption = document.createElement("option");

    productOption.value = color;
    productOption.textContent = color;
    colors.appendChild(productOption);
  }
};

/**
 * add product to local storage on click
 * return an alert in case of error or success
 */

const addProductToCart = (product) => {
  const addToCartButton = document.querySelector("#addToCart");

  addToCartButton.addEventListener("click", () => {
    const quantity = document.querySelector("#quantity");
    const colors = document.querySelector("#colors");

    // the user must select everything before adding the product
    if (colors.value === "" || quantity.value == 0) {
      alert("Veuillez tout sélectionner avant d'ajouter un produit.");
    } else {
      let localStorageContent = localStorage.getItem("cart");
      let data = {
        id: product._id,
        color: colors.value,
        quantity: quantity.value,
      };

      // make changes when the local storage is not empty
      if (localStorageContent !== undefined) {
        changeLocalStorage(data);
      } else {
        createLocalStorage(data);
      }
    }
  });
};

/**
 * make changes to the localStorage on click
 */

const changeLocalStorage = (data) => {
  let localStorageContentJSON = JSON.parse(localStorage.getItem("cart")) || [];
  let productFound = false;

  // change product quantity when it is already added
  for (let product of localStorageContentJSON) {
    if (product.color === data.color && product.id === data.id) {
      product.quantity = parseInt(data.quantity) + parseInt(product.quantity);
      alert("La modification a bien été pris en compte.");
      productFound = true;
    }
  }

  // otherwise add the new product
  if (productFound == false) {
    localStorageContentJSON.push(data);
    alert("Le produit a été ajouté au panier.");
  }

  localStorage.setItem("cart", JSON.stringify(localStorageContentJSON));
};

/**
 * create a new local storage
 */

const createLocalStorage = (productData) => {
  newlocalStorage = [];
  newlocalStorage.push(productData);
  localStorage.setItem("cart", JSON.stringify(newlocalStorage));
  alert("Le produit a été ajouté au panier.");
};
