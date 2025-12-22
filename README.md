# E-Commerce Angular App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

# Specifications 

## Overview

This is a **frontend-only e-commerce application** built with **Angular v20**.
It features **user and admin interfaces**, fully **responsive design**, and modern **UX/UI**. The app is designed as a **static website**.


## Features

### User Interface

* **Home Page** with featured products and categories
* **Product Listing** with search, filter, and category view
* **Product Detail Page** with images, description, ratings, and reviews
* **Cart Management** (add/remove/update items, persistent per user)
* **Checkout Page** to place orders
* **Wishlist Management** per user
* **Order History** with status tracking
* **User Profile** for account info
* **Authentication**: Register, Login, Logout
* **Responsive UI** with modern card-based design and Material icons

### Admin Interface

* **Admin Login**
* **Dashboard** with KPIs: total users, total orders, revenue, product count
* **Products Management**: create, edit, delete products
* **Categories Management**
* **Users Management**
* **Orders Management**: view and update order status
* **Reviews Management**: moderate user reviews
* **Distinct Dark/Neutral Theme** from user interface
* **Sidebar Navigation** and table-based admin layout

### Shared Components

* Product Card, Category Card, Pagination, Rating Stars
* Search Bar, Filter Sidebar, Modal, Confirm Dialog, Spinner, Toast Notification

## Technologies Used

* **Angular 20** (Standalone Components)
* **TypeScript**
* **RxJS** for reactive state management
* **localStorage** for data persistence
* **HttpClient** for loading initial JSON data
* **SCSS / CSS** for styling
* **Material Icons** for visual cues

## Folder Structure (src/app)

```
src/app
├── app.config.ts
├── app.routes.ts
├── app.ts
├── assets/
│   ├── data/ (JSON files for products, users, orders, categories, reviews)
│   └── uploads/ (images for products and avatars)
├── core/ (header, footer, interceptors)
├── guards/ (AuthGuard, AdminGuard, GuestGuard)
├── models/ (User, Product, Category, Order, CartItem, Review)
├── services/ (Auth, Product, Category, Cart, Order, Wishlist, Review, Search)
├── pages/
│   ├── user/ (home, product-detail, cart, checkout, wishlist, orders, profile, login, register)
│   ├── admin/ (admin-login, dashboard, products-management, categories-management, users-management, orders-management, reviews-management)
│   ├── not-found/
│   ├── unauthorized/
│   └── loading/
├── shared/ (cards, pagination, search-bar, filter-sidebar, modal, spinner, toast-notification)
```

## How It Works

1. **Data Initialization**

   * On first load, data is fetched from `src/assets/data/*.json`
   * Data is persisted in `localStorage` for all further use
2. **Services**

   * All business logic (CRUD, cart, wishlist, orders) is handled via Angular services
   * Components subscribe to services using Observables
3. **Guards & Interceptors**

   * AuthGuard, AdminGuard, GuestGuard protect routes based on roles
   * AuthInterceptor injects simulated JWT for demonstration
4. **Role-Based UI**

   * Users and Admins have completely separate interfaces
   * Admin actions affect persisted data and reflect immediately in user interface

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Fadoua-ER/E-commerce-Angular.git
cd E-commerce-Angular
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the application**

```bash
ng serve
```

4. **Access the app**

* User interface: `http://localhost:4200/user/home`
* Admin interface: `http://localhost:4200/admin/admin-login`


## Future Enhancements

* Add real backend API for production
* Replace localStorage persistence with a database
* Add payment gateway integration
* Enhance dashboard analytics and charts
* Add multi-language support

## By
FADOUA ER-RAMY



