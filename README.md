# 🛍️ SIEDRA Shop (React + Vite)

A modern, multilingual e-commerce app for browsing and shopping products, built with React, TypeScript, Redux Toolkit, and Vite for fast development and optimized builds.

## 🔍 Overview

SIEDRA Shop is a single-page application (SPA) for online shopping. Users can browse products by category, filter by color, size, and price, and enjoy a responsive, user-friendly interface. The app supports Arabic and German languages and features a dynamic sidebar for filtering.

## ✨ Features

- **React + Vite**: Fast development with hot module replacement
- **TypeScript**: Type-safe codebase
- **Redux Toolkit**: Global state management
- **Component-Based UI**: Reusable and modular React components
- **Product Catalog**: Browse items with images and details
- **Sidebar Filters**: Filter by category, color, size, price, and sort
- **Routing**: Seamless navigation with React Router
- **Internationalization**: Arabic and German support via i18next
- **Responsive Design**: Works on desktop and mobile
- **ESLint**: Code quality and formatting

## 📋 Requirements

- Node.js 18+
- npm

## 💾 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arabeen100/SIEDRA_SHOP/
   cd siedra-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [https://siedra-shop.vercel.app/](https://siedra-shop.vercel.app/) in your browser.

## 📁 Project Structure

```
SIS/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable React components (Sidebar, Navbar, ProductCard, etc.)
│   ├── features/            # Redux slices and API logic
│   ├── hooks/               # Custom hooks
│   ├── locales/             # i18n translation files
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
├── .eslintrc.cjs            # ESLint config
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 🔰 Basic Usage

### 🛣️ Adding a Route

Define routes in `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 🎮 Creating a Component

```tsx
// src/components/ProductCard.tsx
import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price} EGP</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
```

### 📊 Using Redux for State

```tsx
// src/features/cart/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    // ...other cart logic
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### 👁️ Creating a Page

```tsx
// src/pages/Category.tsx
import React from 'react';
import ProductCard from '../components/ProductCard';

function Category({ products }) {
  return (
    <div className="category-page">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Category;
```

## 🛠️ Helper Functions

Common helpers can be placed in `src/utils/`:

```ts
// src/utils/formatPrice.ts
export function formatPrice(amount: number) {
  return `${amount.toFixed(2)} EGP`;
}
```

## 🗃️ Data & API

Use Redux Toolkit Query in `src/features/api/apiSlice.ts` for API calls:

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getCategories: builder.query({ query: () => '/categories' }),
    // ...
  }),
});
```

## 📜 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 👩‍💻 Author

**Mahmoud Samy Arabeen**