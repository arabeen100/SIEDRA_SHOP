import  type{  PayloadAction } from "@reduxjs/toolkit";
import{ createSlice } from "@reduxjs/toolkit";
interface Product {
  id: string | number;
  count: number;
}

interface ProductsState {
  products: Product[];
}

function loadProductsFromLocalStorage(): Product[] {
  try {
    const data = localStorage.getItem("products");
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed; 
    return [];
  } catch (e) {
    console.error("Invalid products in localStorage", e);
    return [];
  }
}
const initialState: ProductsState = {
  products: loadProductsFromLocalStorage(),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
    },
    setToLocalStorage: (state) => {
      try {
        localStorage.setItem("products", JSON.stringify(state.products));
      } catch (e) {
        console.error("Failed to save products to localStorage", e);
      }
    },
    clearProducts: (state) => {
      state.products = [];
      localStorage.removeItem("products"); 
    },

  },
});

export default productsSlice.reducer;
export const { setProducts, setToLocalStorage, clearProducts} =
  productsSlice.actions;
