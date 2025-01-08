# Kanap - E-commerce Application

This project is a JavaScript-based cart management system designed for an e-commerce application. It retrieves product data from an API, displays it dynamically on the web page, and allows users to manage their shopping cart and place orders.

## Features

1. **Dynamic Product Rendering**
   - Retrieves and displays product data from a REST API.
   - Generates product cards dynamically on the cart page.

2. **Cart Functionality**
   - Adds products to the cart with selected quantities and colors.
   - Updates product quantities in the cart.
   - Deletes products from the cart.

3. **Total Calculation**
   - Dynamically calculates and displays the total quantity and price of products in the cart.

4. **Form Validation**
   - Validates user input for first name, last name, address, city, and email using regular expressions.

5. **Order Submission**
   - Submits the cart and user information as a POST request to the API.
   - Redirects users to a confirmation page with their order ID.

## Folder Structure

```
📂 back-end
├── index.html
├── cart.html
├── confirmation.html
├── 📂 js/
│   ├── app.js
│   ├── cart.js
│   ├── api.js
├── 📂 css/
│   ├── styles.css
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/karukerapixel/kanap.git
   ```

2. Navigate to the project directory:
   ```bash
   cd kanap
   ```

3. Install dependencies (if any):
   ```bash
   npm install
   ```

4. Start a local server to serve the HTML files.

## API Requirements

Ensure the API is running on `http://localhost:3000/api/products/`. The API should support:
- `GET /products` to retrieve all products.
- `POST /order` to place an order.

## Usage

1. Open `index.html` in a browser to view the product list.
2. Navigate to the cart page to manage the cart.
3. Complete the form and place an order.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Author

**Karukera Pixel** 
