/**
 * retrieve the orderID in url params
 */

const displayOrderId = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let orderId = document.querySelector("#orderId");
  orderId.textContent = urlParams.get("orderId");
};
displayOrderId();
