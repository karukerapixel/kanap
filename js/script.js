/**
 * 1. send request to API to retrieve data from all products
 * 2. create product cards
 */

/** 1 */

const fetchRequest = async () => {
  const url = "http://localhost:3000/api/products/";

  try {
    const response = await fetch(url);
    const value = await response.json();

    for (data of value) {
      createProductLink(data);
      createProductImg(data);
      createProductName(data);
      createProductDesc(data);
    }
  } catch (error) {
    Error({ message: "une erreur est survenue", error });
  }
};
fetchRequest();

/** 2 */

/**
 * create product link
 * configure the url settings with the product id
 */

const createProductLink = (product) => {
  const section = document.getElementById("items");

  const productLink = document.createElement("a");
  productLink.href = "./html/product.html?id=" + product._id;
  section.appendChild(productLink);

  createProductCard(productLink);
};

/**
 * create product cards
 */

const createProductCard = (productLink) => {
  const productCard = document.createElement("article");
  productLink.appendChild(productCard);
};

/**
 * create product image
 */

const createProductImg = (product) => {
  const productCards = document.getElementsByTagName("article");

  const productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt + ", " + product.name;

  for (let i = 0; i < productCards.length; i++) {
    productCards[i].appendChild(productImg);
  }
};

/**
 * create product name
 */

const createProductName = (product) => {
  const productCards = document.getElementsByTagName("article");

  const productName = document.createElement("h3");
  productName.classList.add("productName");
  productName.textContent = product.name;

  for (let i = 0; i < productCards.length; i++) {
    productCards[i].appendChild(productName);
  }
};

/**
 * create product description
 */

const createProductDesc = (product) => {
  const productCards = document.getElementsByTagName("article");

  const productDesc = document.createElement("p");
  productDesc.classList.add("productDescription");
  productDesc.textContent = product.description;

  for (let i = 0; i < productCards.length; i++) {
    productCards[i].appendChild(productDesc);
  }
};
