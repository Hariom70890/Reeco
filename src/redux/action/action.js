import axios from "axios";
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

export const updateProductStatus = (productId, status) => {
   return async (dispatch) => {
      try {
         const response = await axios.patch(
            `${process.env.REACT_APP_URL}/products/${productId}`,
            { status }
         );
         dispatch({
            type: UPDATE_PRODUCT_STATUS,
            payload: { productId, status: response.data.status },
         });
      } catch (error) {
         console.error("Error updating product status:", error.message);
      }
   };
};

export const updateProduct = (productId, updatedData) => ({
   type: UPDATE_PRODUCT,
   payload: { productId, updatedData },
});

export const editProductSuccess = () => ({
   type: EDIT_PRODUCT_SUCCESS,
});

export const editProductFailure = (error) => ({
   type: EDIT_PRODUCT_FAILURE,
   payload: error,
});

export const fetchProducts = () => async (dispatch) => {
   try {
      // Dispatch START_LOADING action to set loading to true
      dispatch({ type: START_LOADING });

      const response = await fetch(`${process.env.REACT_APP_URL}/products`);

      if (!response.ok) {
         throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
   } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
   } finally {
      // Dispatch STOP_LOADING action regardless of success or failure
      dispatch({ type: STOP_LOADING });
   }
};
