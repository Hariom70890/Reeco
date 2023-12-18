import {
   EDIT_PRODUCT_FAILURE,
   EDIT_PRODUCT_SUCCESS,
   FETCH_PRODUCTS_FAILURE,
   FETCH_PRODUCTS_SUCCESS,
   UPDATE_PRODUCT,
   UPDATE_PRODUCT_STATUS,
   START_LOADING,
   STOP_LOADING,
} from "../actionTypes/actionTypes";

const initialState = {
   products: [],
   error: null,
   isLoading: false, // Added isLoading state
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_PRODUCT:
         const { updatedData } = action.payload;
         const updatedProduct = state.products.map((product) => {
            if (product.id === action.payload.productId) {
               return { ...product, ...updatedData };
            }
            return product;
         });

         return { ...state, products: updatedProduct };

      case EDIT_PRODUCT_SUCCESS:
         return { ...state, error: null };

      case EDIT_PRODUCT_FAILURE:
         return { ...state, error: action.payload };

      case UPDATE_PRODUCT_STATUS:
         const { productId, status } = action.payload;
         const updatedProducts = state.products.map((product) => {
            if (product.id === productId) {
               return { ...product, status };
            }
            return product;
         });

         return { ...state, products: updatedProducts };

      case FETCH_PRODUCTS_SUCCESS:
         return { ...state, products: action.payload, error: null, isLoading: false };

      case FETCH_PRODUCTS_FAILURE:
         return { ...state, products: [], error: action.payload, isLoading: false };

      case START_LOADING:
         return { ...state, isLoading: true };

      case STOP_LOADING:
         return { ...state, isLoading: false };

      default:
         return state;
   }
};

export default rootReducer;
