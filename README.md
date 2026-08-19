# README.md

# E-Commerce

A full-stack eCommerce web application built to practice and demonstrate modern frontend development concepts, state management, authentication, API integration, and responsive UI design.

> **Status:** In Development

## Overview

This project is an eCommerce application that provides a complete shopping experience, including browsing products, filtering products, managing a wishlist and shopping cart, authentication, user profiles, and placing orders.

The project is being developed as a learning project while following a tutorial and implementing the UI and architecture using my own technology choices and best practices.

## Features

* App navigation
* Product browsing
* Product filtering
* Wishlist management
* Shopping cart
* Maximum quantity per product
* Authentication
* Authorization
* User profile
* Place orders
* Loading states and skeletons
* Animations
* Responsive design
* API integration
* Persistent Redux state

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Redux Toolkit
* Redux Persist
* Redux Selectors
* React Router DOM
* Axios
* Ant Design
* CSS Modules
* BEM methodology

### Backend

* JSON Server
* REST API
* db.json

## Project Structure

```text
ecommerce/
│
├── ecommerce-frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
├── ecommerce-backend/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Architecture

The frontend follows a feature-oriented structure where application logic is organized around specific business features.

Examples include:

* Products
* Authentication
* Wishlist
* Cart
* Orders
* User Profile

Redux Toolkit is used for global state management, while Redux Persist is used to persist selected parts of the application state.

Selectors are used to keep state access organized and reduce unnecessary component logic.


This combination helps keep form logic reusable, predictable, and type-safe.

## Styling

The project uses Ant Design for UI components while maintaining custom styling through CSS Modules.

CSS classes follow the **BEM methodology** where appropriate to keep styles predictable and maintainable.

## API Communication

Axios is used for communication between the frontend and backend.

The application consumes REST API endpoints for operations such as:

* Fetching products
* Authentication
* Managing user data
* Wishlist operations
* Cart operations
* Creating orders

## Getting Started

### Prerequisites

Make sure you have installed:

* npm
* Git

### Clone the repository

```bash
git clone https://github.com/LailaMosbah/eCommerce.git

cd eCommerce
```

### Frontend

```bash
cd ecommerce-frontend
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd ecommerce-backend
npm install
npm run start
```

The exact commands may change depending on the backend configuration.




## Development Goals

This project is also being used to strengthen practical knowledge of:

* React and TypeScript
* Redux Toolkit architecture
* Global state management
* API integration
* Authentication and authorization
* Component reusability
* Responsive UI development
* Error and loading state handling
* Clean project structure
* Scalable frontend architecture

## Future Improvements

Planned improvements may include:

* Building backend by Node.js
* Completing the checkout flow
* Improving error handling
* Adding more loading and empty states
* Improving accessibility
* Optimizing performance
* Adding automated tests
* Improving responsive behavior
* Adding more advanced product filtering
* Improving authentication flow
* Deployment of the frontend and backend

## Learning Resources

This project is based on concepts learned through a practical eCommerce tutorial, with the frontend UI implemented using **Ant Design** instead of the Bootstrap UI used in the original tutorial.

## License

This project is intended for educational and portfolio purposes.
