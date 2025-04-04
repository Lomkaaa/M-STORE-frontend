import { createSlice,PayloadAction } from "@reduxjs/toolkit";



type FiltersState = {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  maxRating: number;
  sortBy: 'name' | 'price' | 'rating' | 'reviewsCount' | 'createdAt';
  sort: 'ASC' | 'DESC';
  categorySort: string;
  brandSort: string;
  search: string;
  discountOnly: boolean;
}

const initialState: FiltersState = {
  page: 1,
  limit: 10,
  minPrice: 0,
  maxPrice: 200000,
  minRating: 0,
  maxRating: 5,
  sortBy: 'price',
  sort: 'DESC',
  categorySort: '',
  brandSort: '',
  search: '',
  discountOnly: false,
  };
  


  const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      setLimit: (state, action: PayloadAction<number>) => {
        state.limit = action.payload;
      },
      setMinPrice: (state, action: PayloadAction<number>) => {
        state.minPrice = action.payload;
      },
      setMaxPrice: (state, action: PayloadAction<number>) => {
        state.maxPrice = action.payload;

      },
      setMinRating: (state, action: PayloadAction<number>) => {
        state.minRating = action.payload;
      },
      setMaxRating: (state, action: PayloadAction<number>) => {
        state.maxRating = action.payload;
      },
      setSortBy: (state, action: PayloadAction<'name' | 'price' | 'rating' | 'reviewsCount' | 'createdAt'>) => {
        state.sortBy = action.payload;
      },
      setSortOrder: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
        state.sort = action.payload;
      },
      setCategorySort: (state, action: PayloadAction<string>) => {
        state.categorySort = action.payload;
      },
      setBrandSort: (state, action: PayloadAction<string>) => {
        state.brandSort = action.payload;
      },
      setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
      setDiscountOnly: (state, action: PayloadAction<boolean>) => {
        state.discountOnly = action.payload;
      },
    },
  });
  
  export const {
    setPage,
    setLimit,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setMaxRating,
    setSortBy,
    setSortOrder,
    setCategorySort,
    setBrandSort,
    setSearch,
    setDiscountOnly,
  } = filtersSlice.actions;
  
  export default filtersSlice.reducer;