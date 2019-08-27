import {
    GET_PRODCUTS,
    ADD_PRODUCT,
   
    ITEMS_LOADING
  } from '../actions/type';
  
  const initialState = {
    products: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_PRODCUTS:
        return {
          ...state,
          products: action.payload,
          loading: false
        };
      
      case ADD_PRODUCT:
        return {
          ...state,
          products: [action.payload, ...state.products]
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }