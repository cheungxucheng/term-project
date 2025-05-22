# 🛍️ CreatureCo 

**CreatureCo ** is a full-stack e-commerce web application developed as a term project. It enables users to browse products, manage their profiles, and perform secure transactions.

---

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT tokens, with options for session or persistent login.
- **Product Search**: Real-time product search functionality.
- **User Profile Management**: View and edit user information, including order history.
- **Shopping Cart**: Add, remove, and manage products in the cart.
- **Responsive Design**: Optimized for various devices using modern CSS and Pug templates.
- **Secure Backend**: Implemented with Node.js, Express, SQLite, and bcrypt for password hashing.

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Pug
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Authentication**: JWT, bcrypt

---

## 📁 Project Structure
```
term-project/
├── public/ # Static assets (CSS, images, JS)
├── src/ # Server-side logic
├── views/ # Pug templates
├── app.js # Main application file
├── database.sqlite # SQLite database
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
```

---

## 🛠️ Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/cheungxucheng/term-project.git
cd term-project
```
2. **Install dependencies**:

```bash
npm install
```
3. **Create the .env file**:
Create a .env file in the root directory and add the following environment variables:
```env
PORT=some_number
SECRET=your_jwt_secret
```
4. **Run the development server**
```bash
npm start
```
5. Open in your browser
   Visit http://localhost:some_number to view the website
