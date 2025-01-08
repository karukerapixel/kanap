/** Retrieve all products data from the API */
const fetchRequest = async () => {
  const url = "http://localhost:3000/api/products/";

  try {
    const response = await fetch(url);
    const products = await response.json();

    const productsContainer = document.getElementById("items");

    for (let product of products) {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    alert("Impossible de charger les produits. Veuillez réessayer plus tard.");
  }
};
fetchRequest();

/** Create the product card */
const createProductCard = ({ _id, imageUrl, altTxt, name, description }) => {
  // Create <a> element
  const productLink = document.createElement("a");
  productLink.href = `./product.html?id=${_id}`;

  // Create <article> element
  const productCard = document.createElement("article");

  // Create <img> element
  const productImg = document.createElement("img");
  productImg.src = imageUrl;
  productImg.alt = `${altTxt}, ${name}`;

  // Create <h3> element
  const productName = document.createElement("h3");
  productName.classList.add("productName");
  productName.textContent = name;

  // Create <p> element
  const productDesc = document.createElement("p");
  productDesc.classList.add("productDescription");
  productDesc.textContent = description;

  // Append elements to the article
  productCard.appendChild(productImg);
  productCard.appendChild(productName);
  productCard.appendChild(productDesc);

  // Append the article to the link
  productLink.appendChild(productCard);

  return productLink;
};
