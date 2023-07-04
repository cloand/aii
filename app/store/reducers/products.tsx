import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Brand: [],
    search: "",
    Categories: [],
    routes: [],
    filterProduct: { totalCount: 0 },
    productName: "",
    totalResults: 0,
};

export const productsSlice = createSlice({
    name: 'products-detail',
    initialState,
    reducers: {
        fetchProducts: (state, actions) => {
            return {
                ...state,
                [actions?.payload?.name]: actions.payload.data,
            };
        },
        fetchRoutes: (state, actions) => {
            return {
                ...state,
                routes: actions.payload
            }
        },
        fetchProductName: (state, actions) => {
            return {
                ...state,
                productName: actions.payload
            }
        },
        fetchFilterProduct: (state, actions) => {
            return {
                ...state,
                filterProduct: actions.payload
            }
        },
        fetchTotalResult: (state, actions) => {
            return {
                ...state,
                totalResults: actions.payload
            }
        },
        fetchSearchResult: (state, actions) => {
            return {
                ...state,
                search: actions.payload
            }
        }
    },
});

export const {
    fetchProducts,
    fetchRoutes,
    fetchProductName,
    fetchFilterProduct,
    fetchTotalResult,
    fetchSearchResult

} = productsSlice.actions;

export default productsSlice.reducer;
