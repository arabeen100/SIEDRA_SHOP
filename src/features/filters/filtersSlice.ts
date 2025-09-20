import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface filtersState {
  color: string;
  size: string;
  sort: string;
  minPrice: number;
  maxPrice: number;
  search:string;
}

const initialState: filtersState = {
  color:"",
  size:"",
  sort:"",
  minPrice:0,
  maxPrice:0,
  search:"",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setColor: (state, { payload }: PayloadAction<string>) => {
      state.color = payload;
    },
     setSize: (state, { payload }: PayloadAction<string>) => {
      state.size = payload;
    },
     setSort: (state, { payload }: PayloadAction<string>) => {
      state.sort = payload;
    },
     setMinPrice: (state, { payload }: PayloadAction<number>) => {
      state.minPrice = payload;
    },
     setMaxPrice: (state, { payload }: PayloadAction<number>) => {
      state.maxPrice = payload;
    },
      setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
      },
  
 
  },
});


export default filtersSlice.reducer;
export const { setColor, setSize,setSort,setMinPrice,setMaxPrice,setSearch } = filtersSlice.actions;